// contollers Acceps the Request from the cleint proceess the Data and also sends Specific Data
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { UploadFiletoCloud } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
//  These is The Controller for the Regiterion of the User 
const register = asyncHandler(async (req, res, next) => {
  //    res.status(200).json({
  //         message:"Ok"
  //     })
  //  Here we will try to Register the User based on the  Given Data That User Provides us
//  kguyu
  //  Step 1 get the user Details like what and all we defined in the UsermodelSchema
  //  Step2 Validation Like user as not left any required field Empty
  //  Step3 Check whether the User Already Exists Or not
  //  Check for the Files Since we are Accepting the Files Also
  // Then Upload Them to Cloudinary
  //  After uploading it onto the Cloudinary You will get the url as an response from the User
  //  Now Store that url in the Database Thing
  //  Aftr the User gets Created Then take data AND STORE IT INTO TO THE DATABASE

  //  Step 1 How to the Data from the Frontend if a User is Sending data .. in FORM,JSON
  // You can actually get the data by req.body
  const { username, email, fullname, Password } = req.body;
  // checking whether we got the data or not
  //  Here with the HELP OF POSTMAN YOU CAN ACTUALLY SEND AND VERIFY THE DATA
  console.log("email", email);
  //  STEP 2 IS FOR VALIDATION
  // if(username=""){
  //     //  API EROROR IS FILE WHCICH WE CREATED TO HANDLE THE ERRORS
  //     throw new ApiError(400,"username is required",)
  // }

  //  Method 2 since i have many fields if i keep
  //  Some is method like map which returns the true or false here since we ae checkin whether the
  // any fileds or empty then we can actaulky send it
  if (
    [username, email, fullname, Password].some((field) => field?.trim() === "")
  ) {
    //  IF ANY OF THE CONDITION TRUE THEN THROW ERROR
    throw new ApiError(400, "All Fields Are Requiredd");
  }

  //  Now comes the Step 3 Important Validation Checking Whther user Exits then tell me to Signup
  //  These Method tells whether the username and email exits or not
  const ExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //    Here in Exited User You will get Null beuase findone checking in the DB
  //   SInce we are not actually inserting anything into the DB WE WLL GET null
  console.log("Existed user", ExistedUser);
  if (ExistedUser) {
    throw new ApiError(400, "User Already Exists");
  }

  //  Step 4 Here We will be Seeing How to Deal With the Files That When a User Uploads  it
  //     User uploads file (Postman/frontend)
  //         ↓
  // Multer middleware
  //         ↓
  // req.file / req.files created
  //         ↓
  // You access file data
  console.log("Files Are", req.files);
  //   checks whether the req.files exists then onlytake up the avatar thing then if avatar Exits Then take
  //  the Path Without these File might crash if nay fields doent thier
  //  Here we are Getting path Becuase multer gives you the path using it you can actually upload it int the
  //  cloudinary thing
  const AvatarImagePath = req.files?.avatar?.[0]?.path;
  //  cjeks the Cover Image
  const CoverImagePath = req.files?.coverImage?.[0]?.path;

  //  Step5   Checks Whether the avatar Image iS Present OR NOT
  if (!AvatarImagePath) {
    throw new ApiError(400, "uNABLE TO Take the Avatar Iamge from the User");
  }

  //  Step6 After Getting the Cover Image pload it int the Cloudnary
  //   Here Aftr uploading to cloudinary it will give you the URL
  //  By using that url i will upload it oint o the DATABASE
  console.log(AvatarImagePath);
  console.log(CoverImagePath);
  
  
  const AvatarUrl = await UploadFiletoCloud(AvatarImagePath);
  const CoverUrl = await UploadFiletoCloud(CoverImagePath);
 console.log(AvatarUrl);
 console.log(AvatarUrl.url);
 
 
  if (!AvatarUrl) {
    throw new ApiError(400, "Avatar Iamge Not Uploaded");
  }

  //  Now Comes The Most Important Part Making Entries into the Db
  const UserFile = await User.create({
    username,
    email:email.toLowerCase(),
    fullname,
    Password,
    avatar: AvatarUrl.url,
    //   Since i have Not Checked Whether Coverurl present here we will check whether CoverUrl is Present
    //  then only get the CoverUrl?.url
    coverImage: CoverUrl?.url || "",
  });

  //  After Each entry Mongodb Creates the id
  //  After Making it Entry into the Db I nned to send Some Data Back into the Frontend
  //  Except the Password Becuase if in response if the PASSWORD AND REFRESHTOKEN INCLUDED THEN IT WILL BE M
  //  MORE  TRUOBLE
  const UserDataToBeSent = await User.findById(UserFile._id).select(
    "-Password -RefreshToken",
  );
  if (!UserDataToBeSent) {
    throw new ApiError(400, "No User Was Not Created");
  }

  //   We have Created one Resopnse thing Called  APIRESPONSE Which Basiclay Helps us to Send the Data

  return res.status(201).json(
    new ApiResponse(200,UserDataToBeSent,"User registration Sunccfull")
  )
});

//  Now we will Create the Controllr for the Login of the USER 
// What and All Do you do in the login tasks Lets 
//  Step1 Take the UserName Password from the Form 
//  Step2 Check Whther the Actually the UserName and Password Are their OR NOT  Like Are they Empty OR Not
//  Step3 Validation Check Whther the Databse Has Any Username And Password 
//  Based on that Passs the Api responseses

//  TODAY WE ARE GONNA SEE HOW Do we send the cooike THING HERE
const Login=asyncHandler(async(req,res)=>{
  // Step 1 Take the rEQUIREMENST From THE bODY 
  const {username,email,Password}=req.body
  //  Step 2  IF THE USER HASNT ENTERD ANY Means 
  if(!username || !email){
    throw new ApiError(400,"ENTER USERNAME OR EMAIL ITS IS REQUIRED")
  }

  // Now Step Three Here We will Check for the validation like username Present or not or email is Present or not 
  //  Below Syntax You can ACtually See but How to Enter Both Username And Email
  // User.findOne({username})
  //  Here You can ACTAULLY sEE How TO CHECK FOR THE DIFFERNT TYPES HERE 
  const UserDataFromDB=await User.findOne({
    $or:[{username},{email}]
  })

  //  Here You Can Actually tell its present or not 
  if(!UserDataFromDB){
    throw new ApiError(404,"User Doesnt Exist")
  }
  

  //  if the User is Present then Check for the Password in the models we ahve already defined how to check passwords 
  // THERE MIGHT BE QUESTION LIKE USERNAME CANT YOU JUST FIND THE PASSWORD 
  //  ANSWER IS PASSWORD ARE STORED IN THE HASHED FORMAT SO WE CAN NOT FIND JUST BY FIND OEN HENCE WE AHVE SEPETARLY W
  //  WRITTEN A METHOD TO DECRYPT THE PASSWORD AND TEHN STORE IT 
  
  //  Here There Might be Question Like Why cant i use User.method beavsue those and all mongodb   Methods

  //  But Here we have  method Userdefined 
  const Passwordvalidation=UserDataFromDB.isPasswordCorrect(Password)
  if(!Passwordvalidation){
    throw new ApiError(404,"PassWord IS INCORRECT")
  }
})
export { register };
