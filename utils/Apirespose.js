class Apirespose{
    constructor(statusCode,data,message="Success"){
        super(message)
        this.statusCode=statusCode
        this.data = data
        this.success = statusCode < 400
    }
}