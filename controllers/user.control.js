import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import {Apirespose} from "../utils/Apirespose.js"
import {uploadTocloudinary} from "../utils/cloudinary.js"
  
const userRegister = asynchandler( async (req,res) =>{
    
   const {username,email,fullname,password} =  req.body
    console.log(username)
   if([username,email,fullname,password].some((field)=> field === "")){
         throw new ApiError(400,"All Fields are Required !!","All Fields are Required !!")
   } 

   const userExisted= await User.findOne({
        $or:[{email},{username}]
    })
    if(userExisted)
    {
        throw new ApiError(401,"Email or Username already existed","Email or Username already existed")
    }
   const avatarlocalpath =  req.files?.avatar[0]?.path;
   let covlocalpath ;
   if(avatarlocalpath === undefined || avatarlocalpath === null){
      throw new ApiError(400,"Avatar is requires","Avatar is requires")
   }
   if(req.files && req.files.coverimg[0] && req.files?.coverimg[0]?.path)
   {
    covlocalpath = req.files?.coverimg[0]?.path;
   }
   const Avatar =   await uploadTocloudinary(avatarlocalpath)
   const coverImg =   await uploadTocloudinary(covlocalpath)

   if(!Avatar){
    throw new ApiError(402,"Avata image is required")
   }
 const user =  await User.create({
    fullname,
    avatar : Avatar.url,
    email,
    password,
    coverimg: coverImg?.url || "",
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