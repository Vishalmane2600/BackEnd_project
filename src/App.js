import  express, { Router }  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

// Importing router 
import userRouter from "../routers/user.route.js";

app.use("/user",userRouter)

export {app} 
//http://localhost:3000/user/register