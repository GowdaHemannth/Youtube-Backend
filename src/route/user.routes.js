import { Router } from "express";
import { register } from "../controllers/user.controller.js";
const router=Router()

//  AS SOON AS THE /USER GOES TO URL IT WILL GIVE AUTHORITY TO THESEFILE THEN 
// AGAIN /REGISTER WILL BE WRITTEN IN THE URL then respectiive method will be called

router.route('/register').post(register)

// If you export it using the default then you can import using a
export {router}