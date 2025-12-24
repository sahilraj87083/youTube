import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    //TODO: create playlist
    if( !name ||
        !description ||
        typeof name !== "string" ||
        typeof description !== "string" ||
        !name.trim() ||
        !description.trim()
    ){
        throw new ApiError(400, 'Name and Description both are required')
    }

    const playlist = await Playlist.create({
        name : name,
        description : description,
        owner : req.user?._id
    })

    if(!playlist){
        throw new ApiError(500, "failed to create playlist");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, playlist, "playlist created successfully"));

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid PlaylistId");
    }

    const playlist = await Playlist.findById(playlistId);

    if(!playlist){
        throw new ApiError(404, 'Playlist not found')
    }

    if(playlist.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, 'You are not authorized to delete this playlist')
    }

    await Playlist.findByIdAndDelete(playlistId)

    return res
        .status(204)
        .json(
            new ApiResponse(
                204,
                {},
                "playlist deleted successfully"
            )
        );
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if( !name ||
        !description ||
        typeof name !== "string" ||
        typeof description !== "string" ||
        !name.trim() ||
        !description.trim()
    ){
        throw new ApiError(400, 'Name and Description both are required')
    }

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid PlaylistId");
    }

    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404, 'Playlist not found')
    }

    if(playlist.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, 'You are not authorized to update this playlist')
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set : {
                name : name,
                description : description
            }
        },
        {
            new : true
        }
    )

    if(!updatedPlaylist){
        throw new ApiError(500, 'Error while updating the playlist')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "playlist updated successfully"
            )
        );

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}