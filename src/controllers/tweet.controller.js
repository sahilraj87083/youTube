import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Like } from "../models/like.models.js"


const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body;

    if(!content || typeof content !== 'string' || !content.trim()){
        throw new ApiError(400, 'content is required')
    }

    const tweet = await Tweet.create({
        content : content,
        owner : req.user?._id
    })

    if(!tweet){
        throw new ApiError(500, "failed to create tweet please try again")
    }

    return res
            .status(201)
            .json(new ApiResponse(201, tweet, "Tweet created successfully"))
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {content} = req.body
    const {tweetId} = req.params

    if(!content || typeof content !== 'string' || !content.trim()){
        throw new ApiError(400, 'content is required')
    }

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweetId")
    }

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404, 'Tweet not found')
    }

    if(tweet.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "You are not authorized to update this tweet");
    }

    if (tweet.content === content.trim()) {
        return res.status(200).json(
            new ApiResponse(200, tweet, "No changes detected")
        );
    }


    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set : {
                content : content
            }
        },
        {
            new : true
        }
    )

    if(!updatedTweet){
        throw new ApiError(500, "Failed to edit tweet please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    const {tweetId} = req.params

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweetId")
    }

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404, 'Tweet not found')
    }

    if(tweet.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "You are not authorized to delete this tweet");
    }

    await Tweet.findByIdAndDelete(tweetId)

    // delete the likes in the db
    await Like.deleteMany({
        tweet : tweetId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, {tweetId}, "Tweet deleted successfully"));

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}