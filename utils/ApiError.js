class ApiError extends Error{
    constructor(
        statusCode,
        errors = [],
        message = "something get error",
    ){
        super(message)
        this.errors = errors
        this.statusCode = statusCode
    }

}

export {ApiError}