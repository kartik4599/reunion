import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/connectDatabase.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
connectDB(process.env.MONGOURI || "");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

app.listen(process.env.PORT || 3000);
