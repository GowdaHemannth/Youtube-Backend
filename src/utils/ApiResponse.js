// Here We will be Handling Response As Well Like How We Handled the Error
class ApiResponse{
    constructor(statusCode,data,message='Success'){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        //  Below status Code 400 Meand the Response is successfull 
        // or Else the it will go to Error 
        this.success=message <400

    }
}

export {ApiResponse}