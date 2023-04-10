import express from "express";
import {
  addPostHandler,
  commentPostHandler,
  deletePostHandler,
  getAllPostHandler,
  getSinglePostHandler,
  likePostHandler,
  unLikePostHandler,
} from "../controllers/postControllers.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const postRoutes = express.Router();

postRoutes.post("/", verifyUser, addPostHandler);

postRoutes.delete("/:postId", verifyUser, deletePostHandler);

postRoutes.post("/like/:postId", verifyUser, likePostHandler);

postRoutes.post("/unlike/:postId", verifyUser, unLikePostHandler);

postRoutes.post("/comment/:postId", verifyUser, commentPostHandler);

postRoutes.get("/:postId", verifyUser, getSinglePostHandler);

postRoutes.get("/", verifyUser, getAllPostHandler);

export default postRoutes;
