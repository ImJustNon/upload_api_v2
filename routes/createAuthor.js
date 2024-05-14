const express = require("express");
const { signJwt } = require("../utils/signJwt");
const router = express.Router();
const { randomNumber } = require("../utils/randomNumber");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.get("/api/v1/author/create", async(req, res) =>{
    const { name } = req.query ?? {};
    if(!name){
        return res.json({
            status: "FAIL",
            message: "Param not found"
        });
    }
    
    const thisAuthorToken = randomNumber(6);
    await prisma.author.create({
        data: {
            author_name: name,
            author_token: thisAuthorToken,
        }
    });

    return res.json({
        token: thisAuthorToken
    });
});


module.exports = router;