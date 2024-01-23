import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

const connect = async()=>{
    try {
        const connecti = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(connecti.connection.host);
        console.log("Connection Done Successfully...!!!!")
    
    } catch (error) {
        console.log("connection error : ",error);
        process.exit(1);
    }
}

export default connect;