const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
    parseJwt: async(jwt_token) =>{
        try {
            return await jwt.verify(jwt_token, config.jwt.secret);
        }
        catch(e){
            return false;
        }
    }
}