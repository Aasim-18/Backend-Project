import asyncHandler from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { User } from '../models/user.model.js';
import { uploadCloudinary } from '../utils/cloudinary.js';
import jwt from "jsonwebtoken";



const generateAccessAndRefereshTokens = async(userId) => {

try {
  const user = await  User.findbyId(userId)
 const accessToken = user.generateAccessToken()
const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

 await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

} catch (error) {

throw new ApiError(500, "Somthing went wrong while generating referesh and access token")
}

}



 const registerUser =   asyncHandler( async  (req, res) => {

  const {fullName, email, username, password} = req.body

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
console.log(req.files)
const avatarLocalPath = req.files?.avatar[0]?.path

const coverImageLocalPath = req.files?.coverImage[0]?.path

if (!avatarLocalPath && !coverImageLocalPath) {
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
 });

const userCreated = await User.findById(user._id).select(
"-password -refreshToken"
 );

if (!userCreated) {
throw new ApiError(500, "Somthing went wrong while Registering User")
 }

return res.status(201).json(

 new ApiResponse(200, userCreated, "User created Succesfully")
 )
 })


const userlogin = asyncHandler(async (req, res) => {

const {username, email, password} = req.body

 if(!username && !email) {
 throw new ApiError(400, "username or email is requred")
 }

const user = await User.findOne({
  $or: [{username}, {email}] })

if(!user) {
throw new ApiError(400, "User does not exists")
 }

const ispasswordValid = await user.isPasswordCorrect(password);

if (!ispasswordValid) {
throw new ApiError(400, "invalid Password")
 }

      const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutuser = asyncHandler( async (req, res) => {

 await User.findByIdAndUpdate(
   req.user._id,
     {

     $unset: {
      refreshToken: 1
      }
   },
  {

   new: true
  }
 )

const option = {
  httpOnly: true,
 secure: true
 }

     return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const RefreshAccessToken = asyncHandler( async(req, res) => {

  const incomingRefreshtoken = req.cookies.refreshToken || req.body.refreshToken

if (!incomingRefreshtoken) {

throw new ApiError(401, "Unauthorized request")
 }

const decodedToken = jwt.verify(incomingRefreshtoken, process.env.REFRESH_TOKEN_SECRET);

 const user = await User.findById(decodedToken?._id)

if (!user) {

throw new ApiError(401, "Invalid Refresh Token")
 }

const options = {

   httpOnly: true,
    secure: true
  }

const {accessToken, newRefreshToken} = generateAccessAndRefereshTokens(user._id)

 return res.
            status(200)
            .cookie(accesstoken, accesstokenoptions)
            .cookie("refreshtoken", newRefreshToken, options)
            .json(
                   new ApiResponse(
                                   200,
                             {accesstoken, refreshtoken: newRefreshToken},
                                        "AccessToken Refreshed"
                             ))

})

export { registerUser,
         userlogin,
         logoutuser,
          RefreshAccessToken}
