import express from "express";
import {
  followHandler,
  unFollowHandler,
  userHandler,
} from "../controllers/userControllers.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const userRoutes = express.Router();

userRoutes.get("/", verifyUser, userHandler);

userRoutes.post("/follow/:userId", verifyUser, followHandler);

userRoutes.post("/unfollow/:userId", verifyUser, unFollowHandler);

export default userRoutes;
