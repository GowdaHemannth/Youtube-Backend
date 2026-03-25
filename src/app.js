import express from "express"
const app=express()
import cors from "cors";

import cookieParser from "cookie-parser";
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



//  importing the Routes Standard Way of Dealing with the Routes 
import { router } from "./route/user.routes.js";


//  From now on We will be using the Standard Way of Declaring the Routes
//  Flow as soon as the USER REACHES THE USER .. user gives control to route file 
//  FROM THERE ON YOU CAN ACTUALLY DO MANY THINGS 
//  these api/version1 is industrial; method of uisng the things
app.use("/api/v1/users",router)

export {app}