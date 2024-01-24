import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {upload} from "../middleware/multer.middle.js"
import {User} from "../models/user.models.js"
import {Apirespose} from "../utils/Apirespose.js"
import {uploadTocloudinary} from "../utils/cloudinary.js"
  
const userRegister = asynchandler( async (req,res) =>{
    
   const {username,email,fullname,password} =  req.body

   if([username,email,fullname,password].some((field)=> field?.trim()==="")){
         throw new ApiError(400,"All Fields are Required !!")
   }
   const userExisted=  User.findOne({
        $or:[{email},{username}]
    })
    if(userExisted)
    {
        throw new ApiError(401,"Email or Username already existed")
    }
   const avatarlocalpath =  req.files?.avatar[0]?.path;
   const covlocalpath =  req.files?.coverimg[0]?.path;
   if(!avatarlocalpath){
    throw new ApiError(400,"Avatar is requires")
   }
   const Avatar =   await uploadTocloudinary(avatarlocalpath)
   const coverimg =   await uploadTocloudinary(covlocalpath)

   if(!Avatar){
    throw new ApiError(402,"Avata image is required")
   }
 const user =  await User.create({
    fullname,
    avatar : Avatar.url,
    email,
    password,
    coverimg: coverimg?.url || "",
    username
   })

   const userCreated = await User.findById(user._id).select("-password -refreshtok")
   if(!userCreated)
   {
    throw new ApiError(500, "Something is wrong in Server Side Scripting")
   }
   
   return res.status(200).json(
    new Apirespose(201,userCreated,"Registration done Successfully")
)
})

export {userRegister}