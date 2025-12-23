import { Like } from "../models/like.models";
import { Video } from "../models/video.models.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import mongoose, {isValidObjectId} from "mongoose";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, 'Invalid VideoId')
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const alreadyLiked = await Like.findOne({
        video : videoId,
        likedBy : req.user?._id
    });

    if(alreadyLiked){
        await Like.findByIdAndDelete(alreadyLiked?._id)

        // decrease the like count in the video
        await Video.findByIdAndUpdate(videoId,
            {
                $inc : {
                    likesCount : -1
                },
                $max : {
                    likesCount : 0
                }
            }
        )

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }));
    }

    
    const like = await Like.create({
        video : videoId,
        likedBy : req.user?._id
    })

    // increase the like count in the video
    await Video.findByIdAndUpdate(videoId, 
        {
            $inc : {
                likesCount : 1
            }
        }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true })); 

})

export {
    toggleVideoLike
}