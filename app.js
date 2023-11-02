// import e from "express";
import express from "express"
import mongoose from "mongoose";
import cors from 'cors'
import studentRouter from './Routes/Student.Route.js'
import adminRouter from './Routes/Admin.Route.js';
import bodyParser from "body-parser";
import accountInfoRouter from './Routes/AccountInfo.Route.js'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3036;
let url = "mongodb+srv://Tout:Lkr8k1SHwWgitNSr@cluster0.mybmtfa.mongodb.net/SCM?retryWrites=true&w=majority"
mongoose.connect(url).then(result => {
    app.use(cors())

    app.get("/",(req,res)=>{
        res.setHeader("Access-Control-Allow-Credentials",true);
        res.setHeader("Access-Control-Allow-Origin: *");
      });
      
    app.use("/admin", adminRouter);
    app.use("/student", studentRouter);
    app.use("/accountInfo",accountInfoRouter);
    app.listen(PORT, () => {
        console.log("Mongoose/server connect")
        console.log(`Application is runing on the port ${PORT}`)
    })
}).catch(err => {
    console.log(err);
    console.log("database not connect")
})
