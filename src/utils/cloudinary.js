import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});

//  Here we will write A Function to Upload a File into the  Cloudinary Thing

//   Steps Multer accepst the File Thing From the FORM AND GIVES PATH TO THE CLODINARY 
//  STEP2 CLOUDINARY TAKE STHE PATH UPLOAD THE FILE CLOUDINARY 
//  STEP3 AFTER UPLOADING FILE TO CLOUD DELETE IT FROM THE SERVER
const UploadFiletoCloud=async(filepath)=>{
    try {
        if(!filepath){
            return null
        }
        // Step2 Upload the Cloudinaty
       const response=await cloudinary.uploader.upload(filepath,{
            //  Here AUTO MEANS YOU CAN UPLOAD THE IMAGE YOU CA UPLOAD THE VIDEO 
            resource_type:"auto"
        })
        //  Step3 After uploading the File Store that one Variable Like RESPOSE
        //  AFTER THESE STORE THESE URL TO OUR DATABASE
        console.log("Yes File Uploaded Succefully:",response.url);
        return response
    } catch (error) {
        fs.unlinkSync(filepath)
        return null
    }

}

export {UploadFiletoCloud}