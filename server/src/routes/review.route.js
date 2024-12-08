import express from "express"
import { body } from "express-validator"
import reviewController from "../controllers/review.controller.js"
import tokensMiddlewares from "../middlewares/tokens.middlewares.js"
import requestHandler from "../handles/request.handler.js"

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokensMiddlewares.auth,
    reviewController.getReviewsOfUser
)

router.post(
    "/",
    tokensMiddlewares.auth,
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId cannot be empty"),
    body("content")
        .exists().withMessage("content is required")
        .isLength({ min: 1 }).withMessage("content cannot be empty"),
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.create
)

router.delete(
    "/:reviewId",
    tokensMiddlewares.auth,
    reviewController.remove
)

export default router;