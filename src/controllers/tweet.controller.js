import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


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
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}