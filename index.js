require('dotenv').config();
const express = require('express');
const passsport = require('passport')
const mongoose = require('mongoose');
var cors = require('cors');
const fileUpload = require("express-fileupload");

const routes = require('./src/routes/index');

const port = process.env.APP_PORT | 4000
const app = express();

app.use(fileUpload({}))
app.use(express.static('public'));
app.use(express.json());
app.use(passsport.initialize());

require('./middleware/passport')(passsport)
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use('/api/v1', routes)

const start = async () => {
    try {
        // connect mongodb database
        mongoose.set("strictQuery", false);
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.wchx7f7.mongodb.net/${process.env.DATABASE_NAME}`)
        .then(() => console.log("DATABASE CONNECTED |> MONGODB"))
        // start rest api
        app.listen(port, () => {
            console.log(`SERVER STARTED ${process.env.APP_DOMAIN} PORT: ${port}`);
        })
    }
    
    catch(e){
        console.error(`SERVER| ${e}`);
    }
}

start();