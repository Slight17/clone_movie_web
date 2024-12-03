import express from "express"
import { body } from "express-validator"

import favoriteController from "../controllers/favorite.controller.js"
import userController from "../controllers/user.controller.js"
import userModel from "../models/user.model.js"
import requestHandle from "../handles/request.handler.js"
import tokensMiddlewares from "../middlewares/tokens.middlewares.js"

const router = express.Router();

router.post(
    "/signup",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ userName: value })
            if (user) return Promise.reject("userName already used")
        }),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("confirmPassword not match");
            return true;
        }),
    body("displayName")
        .exists().withMessage("Display Name is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters"),
    requestHandle.validate,
    userController.signup
);

router.post(
    "/signin",
    body("userName").isLength({ min: 8 }).withMessage("Username minimun 8 characters"),
    body("password").isLength({ min: 8 }).withMessage("Password minimun 8 characters"),
    requestHandle.validate,
    userController.signin
);

router.put(
    "/update-password",
    tokensMiddlewares.auth,
    body("passwork")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters"),
    body("newPassword")
        .exists().withMessage("New Password is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters"),
    body("confirmNewPassword")
        .exists().withMessage("Confirm new Password is required")
        .isLength({ min: 8 }).withMessage("User minimun 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match")
            return true
        }),
    requestHandle.validate,
    userController.updatePassword
);

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

router.post(
    "/favorite",
    tokensMiddlewares.auth,
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandle.validate,
    favoriteController.addFavorite
);

router.delete(
    "/favorite/:favoriteId",
    tokensMiddlewares.auth,
    favoriteController.removeFavorite
);

export default router;


