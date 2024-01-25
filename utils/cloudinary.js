
import fs from "fs"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINAR_CLOUD_NAME, 
  api_key: process.env.CLOUDINAR_API_KEY, 
  api_secret:process.env.CLOUDINAR_API_SECRET
});


const uploadTocloudinary = async (localpath) =>{
   try {
    if(!localpath) return null;
   const res = await cloudinary.uploader.upload(localpath)
   fs.unlinkSync(localpath)
  return res
   } catch (error) {
    fs.unlinkSync(localpath)

   }
}
export {uploadTocloudinary}