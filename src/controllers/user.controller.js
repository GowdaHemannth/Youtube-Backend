// contollers Acceps the Request from the cleint proceess the Data and also sends Specific Data
import { asyncHandler } from "../utils/asyncHandler.js";

const register=asyncHandler(async(req,res,next)=>{
   res.status(200).json({
        message:"Ok"
    })
})

export {register}