import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
const VideoSchema = new Schema({
  videoFile: {
    type: String,
    required: true,
  },
  Thumbnail: {
    type: String,
    required: [
      true,
      "Try To Add a Good Thubnail to get More Views Not Nessecery EvryTime",
    ],
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Duration:{
    type:Number,
    required:true
  },
  Views:{
    type:Number,
    default:0

  },
  isPublished:{
    type:Boolean,
    default:true
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
}
);



export const Video = mongoose.model("Video", VideoSchema);
