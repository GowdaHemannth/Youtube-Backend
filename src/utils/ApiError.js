//  Here I Will be Writting the Customized Code For Error Handling
// Insted of Printting status code error messeg and thse evrythime its good if we use the 
//  these here Errro is Predefined Class
class ApiError extends Error{
    constructor(statusCode,message="SomeThing Went Wrong",errors=[],STACK=""){
        this.statusCode=statusCode,
        this.message=message,
        this.data=null

        this.errors=errors,
        this.success=false
        //  Stack trace is a list of function calls that shows how your program reached the point where the error occurred.
        // Basically Insted of Us Debugging the Each Step it tells Where exqactly and How the Error Ocuured
     if(STACK){
        this.stack=STACK
     }else{
        Error.captureStackTrace(this,this.constructor)
     }
    }
}
export{ApiError}
