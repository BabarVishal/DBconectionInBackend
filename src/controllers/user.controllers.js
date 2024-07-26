import { asyncHandler } from "../utils/asyncHander.js";
import {ApiError} from "../utils/api.error.js";
import {User} from "../models/user.modal.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponce} from "../utils/Apiresponce.js";

const generateAccessTokenandgenerateRefreshToken = async(userId) =>{
  try {
   const user = await User.findById(userId);
  const AccessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken
  await user.save({valiudateBeforeSave: false})

  return {AccessToken, refreshToken}
  } catch (error) {
    throw new (400, "Something Went wrong while genreting refresh and accessToken!");
  }
}

const registerUser = asyncHandler( async(req, res) => {
    //get user details from frontend;
     const {fullName, email, password} = req.body
    //validation - not empty;
    if (
        [fullName, email, password].some((field) =>
        field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All Fields are required");
    }
    //check if user already exists: userName, email;
  const existUser = User.findOne({
        $or: [{ fullName}, {email}]
    })
    if(existUser){
        throw new ApiError(409, "User with email or Username already exits");
    }
    // check for images, check for avatar;
    const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is require");
   }
    //upload them to cloudinary, avtar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(400, "Avatar file is require");
   }
    //create user object = create entry in db
 const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    })
    //remove password and refresh tokan field from responce
    //cheak for user creted;
   const cretedUser = await user.findById(User._id).select(
    "-password - refreshToken"
   )

   if(!cretedUser){
    throw new ApiError(500, "Something went wrong");
   }
    //return responce;
  return res.status(201).json(
    new ApiResponce(200, cretedUser, "User register Succesfully")
  )
})

const loginUser = asyncHandler(async (req, res)=>{
    //req body
    const {fullName, email, password} = req.body;
    //userName and email
    if (!(fullName || email)) {
      throw new (400, "fullName and email is require!");
    }
    //find the user
   const user = await User.findOne({
      $or: [{fullName}, {email}]
    })

    if(!user){
      throw new (400, "user not found");
    }
    //password check
   const isPasswordValid = await user.isPasswordCorrect(password)
   if(!isPasswordValid){
    throw new (400, "user not found");
  }
    //access and refreshTokan
 const {AccessToken, refreshToken} =  await
  generateAccessTokenandgenerateRefreshToken(user._id);

   return res
   .status(200)
   .cookie("AccessToken", AccessToken, Option)
   .cookie("refresToken", refreshToken, Option)
   .json(
    new ApiError(200,{
      user:loginUser,AccessToken, refreshToken
    },
    "User logIN Successfully!"
  )

   )

})

const logOut = asyncHandler((req, res)=>{
 User.findByIdAndUpdate(
  req.user._id,{
    $set:{
      refreshToken: undefined
    }
  }
 )
 const options = {
  httpOnly : true,
  secure: true
 }

return res
.status(200)
.clearCOOkie("AccessToken")
.clearCOOkie("refreshToken")
.json(new ApiError(200, {}, "User loggrd out"))

})

export {
  registerUser,
  loginUser,
  logOut
}