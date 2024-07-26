import { ApiError } from "../utils/api.error";
import { asyncHandler } from "../utils/asyncHander";
import { User } from "../models/user.modal";

export const verifyJWT = asyncHandler(async(req, res, next)=>{
 try {
    req.cookies?.accessToken || req.header("Authorization")
   
    if(!token){
       throw new ApiError(400, "Unauthorized req");
    }
   
    const decodedToken = jwt.verifyJWT(token, process.env.ACCESS_TOKEN_SECRET)
   
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   
    if(!user){
       throw new ApiError(400, "Unauthorized req");
    }
   
   req.user = user;
   next()
   
 } catch (error) {
  
        throw new ApiError(400, "Invalid access token", error);

 }
})

