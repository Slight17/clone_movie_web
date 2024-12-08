import mongoose from "mongoose";
import modelOptions from "./model.option.js";

const { Schema } = mongoose;

export default mongoose.models.Review || mongoose.model(
    "Review",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        mediaId: {
            type: String,
            required: true
        },
        mediaTitle: {
            type: String,
            required: true
        },
        mediaPoster: {
            type: String,
            required: true
        },
    }, modelOptions)
)