const multer = require("multer");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../config/config");
const FormData = require('form-data');
const jwt = require("jsonwebtoken");
const { verifyJwt } = require("../utils/verifyJwt");
const { parseJwt } = require("../utils/parseJwt");
const { PrismaClient } = require("@prisma/client");
const { randomNumber } = require("../utils/randomNumber");
const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage 
});


router.post("/api/v1/upload", upload.single("file"), async(req, res) =>{
    const getJwtToken = await verifyJwt(req);
    if(!getJwtToken){
        return res.json({
            status: "FAIL",
            message: "Can not verify bearer token",
            error: true,
        });
    }
    const getAuthorToken = await parseJwt(getJwtToken);
    if(!getAuthorToken){
        return res.json({
            status: "FAIL",
            message: "corrupted JWT Token",
            error: true,
        });
    }
    const authorToken = getAuthorToken.token;

    try {
        const checkToken = await prisma.author.findFirst({
            where: {
                author_token: authorToken,
            },
            select: {
                id: true
            }
        });
        if(!checkToken){
            return res.json({
                status: "FAIL",
                message: "author not found",
                error: true
            });
        }

        const randomFileId = randomNumber(25);
        const fileBuffer = req.file.buffer;
        const fileOriginalName = req.file.originalname;
        const fileName = `${new Date()}`;
        const fileContentType = req.file.mimetype;
        const fileType = fileContentType.split("/")[1];
        // Send to Discord webhook
        const formData = new FormData();
        formData.append('file', fileBuffer, { 
            filename: `${fileName}.${fileType}`,
        });
        try {
            const response = await axios.post(config.discord.webhook_url, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });
            // save to database by prisma
            const data = await prisma.fileInfo.create({
                data: {
                    file_id: String(randomFileId),
                    file_name: response.data.attachments[0].filename,
                    file_type: fileType,
                    file_name_original: fileOriginalName,
                    file_content_type: fileContentType,
                    file_size: String(response.data.attachments[0].size),
                    channel_id: response.data.channel_id,
                    message_id: response.data.attachments[0].id,
                    discord_cdn_url: response.data.attachments[0].url,
                    author_token: authorToken,
                }
            });
            console.log("[Upload] ", {
                id: randomFileId,
                url: `http://127.0.0.1:8686/api/v1/call/${randomFileId}`,
                content_type: fileContentType,
                create_at: data.create_at,
            });
            return res.json({
                status: "SUCCESS",
                message: "OK",
                error: null,
                data: {
                    id: randomFileId,
                    url: `http://127.0.0.1:8686/api/v1/call/${randomFileId}`,
                    content_type: fileContentType,
                    author_id: checkToken.id,
                    create_at: data.create_at,
                }
            });
        }
        catch(e){
            return res.json({
                status: "FAIL",
                message: "Internal Server Error",
                error: e.response ? e.response.data : e.message,
            });
        }

    }
    catch(e){
        return res.json({
            status: "FAIL",
            message: "Something went wrong",
            error: e,
        });
    }
});


module.exports = router;