import mongoose, { Schema} from 'mongoose'

import jwt from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
//  Above Two Packages 

const UserSchema=new Schema(
    {
     username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
     },
     
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
     },
     fullname:{
        type:String,
        required:true,
        index:true,
        trm:true
     },
     avatar:{
        // Since we will be Using the Third party Service for the Storage of the Images,Videos
      //    we will get that url and Paste it Here
        type:String ,
        required:true
     },
     coverImage:{
      //  Same we will upload these into the On of Cloud we will get one 
      // URL THAT WE ARE GONNA REPLACE IT HERE
      type:String,

     },
     WatchHistory:[
      {
         type:Schema.Types.ObjectId,
         ref:"Video"
      }
     ],
   // Password Encryption and Decrption
   Password:{
      type:String,
      //  These Array Structure can be used where ever i am using th Password
      required:[true,'Password IS Required']
   },
   AccessToken:{
      type:String
   }

    },{
      timestamps:true
    }
)

//  Here we are Gonna Use the Pre Hook Which Helps like. if a user wants to some Operation
// Before the Data Gets Stored inside the DB We Like to Some Operation

//  These is One type of Middleware here we wont be Using the Async Function Beacase here we cant be using This
UserSchema.pre("save", async function(next){
   //  Here we will be Using the isModified which tells particular Field is Modified or Not
   // Here if the Password is Not Modilef then only We use 
   // isModified used to Chwwck whether the Given Field Modified or not
   if(!this.isModified("Password"))  return next();
   this.Password=bcrpyt.hash(this.Password,10)
   next()
})

//  Here you Need to Check Whtehr the User Enterd the Correct Password or Not
// Here When the USer Enterd Password Our Job is To Chkc whetehr the Given Pasword is Correct Or Not
UserSchema.methods.isPasswordCorrect=async function(password){
   //  it returns true if the value goes 
 return  await bcrpyt.compare(password,this.Password)
//                           Here Password Are saved in bycroyt  tahts why we comapre the passwords 
//                           by comapring it with bcrpyt
}
export const User=mongoose.model("User",UserSchema)