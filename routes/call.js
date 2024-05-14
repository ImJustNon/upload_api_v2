const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");
const mime = require('mime-types');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/api/v1/call/:id", async(req, res) =>{
    const { id } = req.params ?? {};
    if(!id){
        return res.json({
            status: "FAIL",
            message: "ID not found",
            error: true,
        });
    }
    try {
        // get file information from id
        const getFileInfo = await prisma.fileInfo.findFirst({
            where: {
                file_id: id
            },
            select: {
                file_id: true,
                file_type: true,
                file_content_type: true,
                discord_cdn_url: true,
            }
        });
        if(!getFileInfo){
            return res.json({
                status: "FAIL",
                message: "This File ID not found",
                error: true
            }); 
        }

        // request to discord cdn to get file data
        const fileUrl = getFileInfo.discord_cdn_url;
        const fileContentType = getFileInfo.file_content_type;
        const response = await axios.get(fileUrl, {
            responseType: 'arraybuffer', // Important for binary data
        });
        console.log("[Call] ", {
            ...getFileInfo
        });
        res.setHeader('Content-Type', fileContentType);
        res.setHeader('Content-Length', response.data.length);
        res.end(response.data, 'binary');
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