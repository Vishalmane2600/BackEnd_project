import { Router } from "express";
import { userRegister } from "../controllers/user.control.js";
import {upload} from "../middleware/multer.middle.js"

const router = Router()

router.route("/register").post(upload.fields([
    {
        name : "avatar",
        maxCount:1
    },
    {
        name : "coverimg",
        maxCount:1
    }
]),userRegister)

export default router