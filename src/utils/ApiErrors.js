

   class ApiError extends Error {
     constructor(
     statusCode,
     message= "Somthing went wrong",
     error= [],
    statck = ""
   ){

    super(message)
   this.statuscode = statuscode
   this.data = null
   this.message = message
   this.sucess = false,
   this.errors = errors
  
  if (statck) {
    this.stack = statck

} else{
   Error.captureStackTrace(this, this.constructor)
}


  }

}



export default {ApiError}
