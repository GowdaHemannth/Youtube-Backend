         
        //    Here in the these its nothing But the function passed Has 
        //  Here we are jusyt Passing the Fucntion has Paramter 
        // But AS you can see we are calling normal async Fucntion Only 
const asyncHandler=(fn)=>async(res,req,next)=>{
    try {
        await fn()
        
    } catch (error) {
        console.log("Error Ocuures:",error);
        
        
    }
}