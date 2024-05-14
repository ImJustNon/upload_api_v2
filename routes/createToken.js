const express = require("express");
const { signJwt } = require("../utils/signJwt");
const router = express.Router();


router.get("/api/v1/author/token/create", async(req, res) =>{
    const { t } = req.query ?? {};
    if(!t){
        return res.json({
            status: "FAIL",
            message: "Param not found"
        });
    }
    const signedToken = await signJwt({
        token: t,
    });

    return res.json({
        token: signedToken
    });
});


module.exports = router;