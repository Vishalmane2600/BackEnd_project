import connect from "../database/index.js";
import dotenv from "dotenv"
import {app} from "./App.js"

dotenv.config({
   path:'./env'
})

connect()
.then((res)=>{
   app.listen(process.env.PORT || 3000,()=>{
      console.log("Server is Running at Port :",process.env.PORT )
   })
})
.catch((error)=>{
   console.log("connection Error : ",error);
})