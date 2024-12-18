import express from "express";
import userRoute from "../routes/user.route.js";
import mediaRoute from "../routes/media.route.js";
import personRoute from "../routes/person.route.js";
import reviewRoute from "../routes/review.route.js";    



const router = express.Router();

router.use("/user", userRoute);
router.use("/review", reviewRoute);
router.use("/person", personRoute);
router.use("/:mediaType", mediaRoute);

export default router;
