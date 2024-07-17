import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userModal =  new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar:{
            type:String, //cloudinary Url
            require: true
        },
        coverImage:{
            type: String   //cloudinary Url
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            require:[true, "password is require"]
        },
        refreshToken:{
            type: String
        }
    },
    {timestamps: true}
)

userModal.pre("save", async function (next){
  if(!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10)
  next()
})

userModal.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userModal.methods.generateAccessToken = function(){
  return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIN: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};
userModal.methods.generateRefreshToken = function(){
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIN: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User", userModal);