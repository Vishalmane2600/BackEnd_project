import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Userschema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      index:true
    },
    fullname: {
      type: String,
      require: true,
      lowercase: true,
    },
    avatar: {
        type: String,
        require: true,
      },
      coverimg: {
        type: String,
      },
      password:{
        type:String,
        require:[true,"Password must have to fill"]
      },
      refreshtok:{
        type:String,
      }

  },
  { timestamps: true }
);

Userschema.pre("save", async function (next){
         if(this.isModified("password"))
         {
             this.password = await bcrypt.hash(this.password,8)
         }
         next()
    })
Userschema.methods.isPasswordCorrect = async function (password){
      return bcrypt.compare(password,this.password)
}
Userschema.methods.getAccessToken = function(){
  return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPITY
        }
    )
}
Userschema.methods.getRefreshToken = function(){
   return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPITY
        }
    )
}


export const User = mongoose.model("User", Userschema)