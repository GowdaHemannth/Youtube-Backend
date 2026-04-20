//  Here We Will BE dOING THE JWT VERIFCATION
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

import jwt from "jsonwebtoken";
export const VerifyJwt = asyncHandler(async (req, res, next) => {
  //  Here We Might Get Confused Regading What to Use Waht Not tO USE
  //  bASED ON THE dESING OF THE tOKEN yOU nEED TO uSE THE tOKENS
  try {
    
    const Token =
      req.cookies?.AccessTokens ||
      req.header("Authorization")?.replace("Bearer ", "");
      //  If the Case Case Token is Not Their 
      if(!Token){
          throw new ApiError(401,"Unauthorized User")
      }
  
      //  2nd Case Even Though You Found the Token  we need to verify that Given Token is Correct or Not 
   const DecodedToken=   jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
  
  //   Here Decoded Token in the Sense it Contains All the Information which You Gave 
  //  DURING THE CREATION OF THE TOKEN 
  //  AFTER THESE MAKE A DB CALL FIND THAT THESE EXISTS OR NOT 
  
  const User=await User.findById(DecodedToken?._id).select("-Password -RefreshToken")
  
  if(!User){
      //  DISCUSIION ABOUT THE TODO OR FORNTEND
      throw new ApiError(401,"USER DOESNT EXISTS IN DATABASE ")
  
  }
  
  //  Here We Might be Thinking If Evrything is Correct In the Sense THEN WHATS THE ISSUE 
  //  JUST RETURN SOMETHING NO IF EVRYTHING IS CORRECT THEN WE NEED TO GIVE ACCESS RIGHT 
  req.user=User
  next()
  
  } catch (error) {
    throw new ApiError(401,error?.message||"Invalid Response")
    
  }
});
