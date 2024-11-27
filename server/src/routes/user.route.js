import express from "express"
import { body } from "express-validator"

import favoriteController from "../controllers/favorite.controller.js"
import userController from "../controllers/user.controller.js"
import userModel from "../models/user.model.js"
import requestHandle from "../handles/request.handler.js"
import tokensMiddlewares from "../middlewares/tokens.middlewares.js"

const router = express.Router();






router.get(
    "/info",
    tokensMiddlewares.auth,
    userController.getInfo
);

router.get(
    "/favorite",
    tokensMiddlewares.auth,
    favoriteController.getFavoriteOfUser
);


router.delete(
    "/favorite/:favoriteId",
    tokensMiddlewares.auth,
    favoriteController.removeFavorite
);

export default router;


