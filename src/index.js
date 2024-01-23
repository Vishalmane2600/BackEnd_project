import connect from "../database/index.js";
import dotenv from "dotenv"

dotenv.config({
   path:'./env'
})

connect();