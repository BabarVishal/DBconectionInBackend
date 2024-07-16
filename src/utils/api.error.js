class ApiError extends Error{
    constructor(
      statusCode,
      message= "Somethingg went wrong",
      Error = [],
      statck = ""
    ){
     super(message)
     this.statusCode = statusCode
     this.data = null
     this.message = message
     this.success =false;
     this.Error = Error

     if (statck) {
        this.stack = statck
     }else{
        Error.captureStackTrace(this, this.constructor)
     }
    }
}

export {ApiError}