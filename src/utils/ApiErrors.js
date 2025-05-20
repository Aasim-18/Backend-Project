

   class ApiError extends Error {
     constructor(
     statusCode,
     message= "Somthing went wrong",
     error= [],
    stack = ""
   ){

    super(message)
   this.statuscode = statuscode
   this.data = null
   this.message = message
   this.sucess = false,
   this.errors = errors
  
  if (stack) {
    this.stack = stack

} else{
   Error.captureStackTrace(this, this.constructor)
}


  }

}



export  { ApiError }
