import { Router } from "express";

import  { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logoutUser, userlogin } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(

upload.fields([

 {
   name: "avatar",
   maxCount: 1
  },
 {
  name: "coverImage",
  maxCount: 1
 }

]),

registerUser
)

router.route("/userlogin").post(userlogin)
router.route("/userlogout").post(verifyjwt, logoutUser)


export default router
