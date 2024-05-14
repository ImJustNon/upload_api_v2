const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async(req, res) =>{
    return res.json({
        status: "OK",
        message: "Server Alive",
        error: null,
        data: {
            create_token: {
                target: "GET /api/v1/author/token/create?t=[token]",
            },
            upload: {
                target: "POST /api/v1/upload",
                form_data: {
                    authorization: "Bearer [token]",
                    file: "[file want to upload]"
                }
            },
            call: {
                target: "GET /api/v1/call/[id]",
            },
            docs: "https://github.com/ImJustNon/upload_api_v2/blob/main/README.md"
        }
    });
});


module.exports = router;