import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token;
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (req.user) {
        next();
      } else {
        throw Error("User not identified");
      }
    } else {
      res.status(404).json({ msg: "User not identified" });
    }
  } catch (e) {
    res.status(404).json({ msg: "User not identified" });
    console.log(e);
  }
};
