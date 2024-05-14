require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    discord: {
        webhook_url: process.env.DISCORD_WEBHOOK_URL,
    }
}