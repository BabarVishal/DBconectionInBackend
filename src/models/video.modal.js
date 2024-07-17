import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema(
    {
         videoFile:{
            type: String, //cloudinary url
            require: true
         },
         thumbnail:{
            type: String, //cloudinary url
            require: true
         },
         title:{
            type: String, 
            require: true
         },
         description:{
            type: String,
            require: true
         },
         duration:{
            type: Number, //cloudinary url
            require: true
         },
         views:{
            type: Number,
           default: 0
         },
         ispublished:{
            type: Boolean,
            default: true
         },
         owner:{
            type: Schema.types.ObjectId,
            ref:"User"
         }
    },{
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema);