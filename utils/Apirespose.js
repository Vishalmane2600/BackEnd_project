class Apirespose{
    constructor(statusCode,data,message="Success"){
        this.message = message
        this.statusCode=statusCode
        this.data = data
        this.success = statusCode < 400
    }
}

export {Apirespose}