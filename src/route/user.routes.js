import { Router } from "express";
import { Login, LogoutUser, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
const router=Router()

//  AS SOON AS THE /USER GOES TO URL IT WILL GIVE AUTHORITY TO THESEFILE THEN 
// AGAIN /REGISTER WILL BE WRITTEN IN THE URL then respectiive method will be called

//  Here multer nothing its a middleware which accepts the File handling and stores temaporly and gives file path 
// which then used for the uploading the file to the cloudinary 
//  STEP3 HOW TO INJECT A MIDDLEWARE
//  Middleware nothing but befoev accepting any filed jsut meet once so Here wHat happens is 
// Since register before it happens if files aviable then take up those Take uyp those Files
router.route('/register').post(
    
    upload.fields([
        {name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    register
)


//  Defining One More Router Here Like ITS PRETTY MUCH
router.route('/Login').post(Login)


//  Secured Routes Here Secured Routes in the Sense 
//  WE NEED TO VERIFY IT BEFORE ITS BEGAN ITS WORK 
//    You All Remmember We Used Next IN VerifyJwt Where 
//  Becuase After Verification Here LogoutUser Should Also Run Right 
router.route("/Logout").post( VerifyJwt,LogoutUser)
// If you export it using the default then you can import using a
export {router}