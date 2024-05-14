const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const multer  = require('multer');

const config = require("./config/config.js");

const urlEncoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
});
const expressJson = express.json({
    limit: "50mb",
});


app.use(cors());
app.use(expressJson);
app.use(urlEncoded);
app.use(morgan("dev"));
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next(); 
// });
app.get("/hello", (req, res) =>{
    return res.send("Hello, Word!");
});

const getAllRouterFileName = fs.readdirSync(path.join(__dirname, "./routes"));
const filteredRouterFileName = getAllRouterFileName.filter(fileName => fileName.endsWith(".js"));
filteredRouterFileName.forEach(filteredFileName =>{
    try {
        // const router = require(path.join(__dirname, "./routes", filteredFileName));
        const router = require(`./routes/${filteredFileName}`)
        app.use(router);
        console.log(`[Router] Loaded success : routes/${filteredFileName}`);
    }
    catch(e){
        console.log(`[Router] Can not Load : routes/${filteredFileName} : `, e);
    }
});


function startServer(){
    app.listen(config.port, () =>{
        console.log(`> Started server at port : ${config.port} : http://127.0.0.1:${config.port}`);
    }); 
}

startServer();