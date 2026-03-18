//  dot env loads all the env varibles Once the File Starts
// Here in Package.json We HAVE MENTIONE TAHT INDEX.JS IS THE STARTING FILE
//  Its Good Practice to use the dot env in the index.js
// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
//  Since we are Using the environmnt Variables IN MANY THINGS IN FILE STRUCTURE HENCE ITS GOOD TO
//  USE THE DOT ENV
import { app } from "./app.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import ConnectDB from "./db/index.js";
dotenv.config({ path: "./env" });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

// like reciving the Data in JSON FORMAT
//  Here these is Middleware where we atelli9ng if the data comes trough json make it in redble format
app.use(express.json({ limit: "16kb" }));

//  IF ANY CONTENT TYPE IS URL THING THEN USE THESE MIDDLEWARE
app.use(express.urlencoded({extended:true}))

//  Sometimes we will get the Response in the PDF FORMAT OR FILE FORMAT IN THAT CASE YU NED TO 
// STORE IT MANUALLY
app.use(express.static('public'))

//  usage of the cookie parser
app.use(cookieParser())

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("db connected succlefully server also runnubg");
    });
  })
  .catch((e) => {
    console.log("DB CONNCTION FIALED", e);
  });
// Here bove We will e importimg the
// There is One More Thing in Javascript called emp
// Here What Happens IN the Sense there are some function where you need to call that fnction as soon as the
//  fucntion created

// HERE INSTEAD OF WRITTING THE WHOLE CODE YOU CAN ACTUALLY Write these Code in the Seperate File Thing
// Like You Can Actaully Write Thes ein Seperate File Whereyou can Add these Things

// const app=express()

// (async()=>{
//      try{
//          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         //  Here below code signifies that Express is not able to Listen to Db Thats the Issue Here
//          app.on("error",(error)=>{
//             console.log("EXPRESS NOT ABLE TO LISTEN TO DB:",error);

//          })
//         //   Here if the Express App IS LISTENING
//         app.listen(process.env.PORT,()=>{
//             console.log("DB CONNECTED APP IS LISTENING WELL AND GOOD ");

//         })
//      }
//      catch(error){
//         console.log("Error Appeared As we were connecting To DATABSE:",error);

//      }
// })()
