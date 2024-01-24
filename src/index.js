import connect from "../database/index.js";
import dotenv from "dotenv"

dotenv.config({
   path:'./env'
})

connect()
.then((res)=>{
   console.log(res);
})
.catch((error)=>{
   console.log("connection Error : ",error);
})