const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async(req, res) =>{
    // await prisma.author.create({
    //     data: {
    //         author_name: "non",
    //         author_token: "nonlnwza",
    //     }
    // });
});


module.exports = router;