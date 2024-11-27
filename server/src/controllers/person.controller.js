import responseHandler from "../handles/response.handler";
import tmdbApi from "../tmdb/tmdb.api";

const personDetail =    async (req, res) =>{
    try {
        const { personId } = req.params

        const person = await tmdbApi.personDetail({ personId })
        responseHandler.ok(res)

    } catch (error) {
        responseHandler.error(res)
    }
}

const personMedia = async (req, res) => {
    try {
        const { personId } = req.params
        const medias = await tmdbApi.personDetail({ personId })

        responseHandler.ok(res, medias)

    } catch (error) {
        responseHandler.error(res)
    }
}

export default {personDetail, personMedia}