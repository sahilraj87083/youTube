import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    videos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Video'
        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    totalVideos : {
        type : Number,
        default : 0
    },
    visibility: {
        type: String,
        enum: ["public", "private", "unlisted"],
        default: "public"
    }
}, {timestamps : true})

export const Playlist = mongoose.model('Playlist', playlistSchema)