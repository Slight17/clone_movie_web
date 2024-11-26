import responseHandler from "../handles/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js"
import userModel from "../models/user.model.js";
import favorite from "../models/favorite.model.js";
import review from "../models/review.model.js";

const getList = async (req, res) =>{
    try {
        const { page } = req.query

        const { mediaType, mediaCategory } = req.params

        const response = await tmdbApi.mediaList({mediaType, mediaCategory, page})
    } catch  {
        responseHandler.error(res)
    }
}