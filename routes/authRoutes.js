import express from "express";
import { loginHandler, signUpHandler } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUpHandler);

authRoutes.post("/login", loginHandler);

export default authRoutes;
