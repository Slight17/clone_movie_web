import privateClient from "../client/private.client";

const reveiwEndpoint = {
    list: "reviews",
    add: "reviews",
    remove: ({ reviewId }) => `reviews/${reviewId}`

}

const reviewApi = {
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content
    }) => {
        try {

            const response = await privateClient.post(
                reveiwEndpoint.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    content
                }
            );
            return response;

        } catch (error) {
            return {error}
        }
    },
    remove: async ({ reviewId }) => {
        try {

            const response = await privateClient.delete(
                reveiwEndpoint.remove({ reviewId })
            );
            return response;

        } catch (error) {
            return {error}
        }
    },
    getList: async () => {
        try {

            const response = await privateClient.get(
                reveiwEndpoint.list({ reviewId })
            );
            return response;

        } catch (error) {
            return {error}
        }
    }
}
export default reviewApi;