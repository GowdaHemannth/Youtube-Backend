//    Here in the these its nothing But the function passed Has
//  Here we are jusyt Passing the Fucntion has Paramter
// But AS you can see we are calling normal async Fucntion Only

//  This is the Method Two Where i can actually Do Plenty of Things 
const asyncHandler=(requesthandler)=>{
   return (req,res,next)=>{
     Promise
     .resolve(requesthandler(req,res,next))
     .catch((e)=>
        //  Here its Nothing we are pssing thes eintop the error Middleware 
    //   Where error will be handled
        next(e)
     )
    }
}

export {asyncHandler}
// This is the Method One 

// const asyncHandler = (fn) => async (req,res, next) => {
//   try {
//     await fn(res,req,next);
//   } catch (error) {
//     // console.log("Error Ocuures:", error);
//     res.status(error.code||500).json({
//         status:false,
//         message:error.message
//     })
//   }
// };
