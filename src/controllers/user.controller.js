 import asyncHandler from '../utils/asynchandler.js';

 import { ApiError } from '../utils/ApiErrors.js';

 import { User } from '../models/user.model.js';

import { uploadCloudinary } from '../utils/cloudinary.js';



 const registerUser =   asyncHandler( async  (req, res) => {

 
  const {fullName, email, username, passsord} = req.body

 if (
  [fullName, email, username, password].some((field) => 
  field?.trim() === "") 
 ) {

  throw new ApiError(400, "All field are reqired")
  }


  const existedUser = User.findOne({

 $or: [{username}, {email}]
})

if (existedUser) {
  throw new ApiError(409, "User with email or username exist")

 };

const avatarLocalPath = req.files?.avatar[0]?.path

const coverImageLocalPath = req.files?.coverImage[0]?.path

if (!avatarLocalPath || !coverImageLocalPath) {
 throw new ApiError(500, "avatar or coverImage not found")
}


const avatar = await uploadCloudinary(avatarLocalPath);

const coverImage = await uploadCloudinary(coverImageLocalPath)

if (avatar) {

 throw new ApiError(400, "avatar image is required")
}

const user = await User.create({
 fullName,
  avatar: avatar.url,
  coverImage: coverImage.url,
  email,
 username: username.toLowerCase(),
 password
 })


})
export { registerUser }
