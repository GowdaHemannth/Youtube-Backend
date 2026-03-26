//  here it returns the File Path That file path will be used by cloudinary to upload it into the 
// Here multer provides the FILE PATH WHICH WILL BE USED BY THE CLOUDINARY TO UPLOAD TO UPLOAD IT INTO
// What Multer Actually Does

// 👉 Multer:

// Accepts file from frontend
// Processes multipart/form-data
// Stores file temporarily (disk/memory)
// Gives you info like:
// req.file



// What You Get from Multer
// req.file = {
//   path: "uploads/abc123.jpg",
//   originalname: "photo.jpg",
//   mimetype: "image/jpeg"
// }

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})