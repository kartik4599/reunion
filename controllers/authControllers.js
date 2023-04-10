import dotenv from "dotenv";
import User from "../models/userModel.js";
import bycrpt from "bcryptjs";
import { genrateToken } from "../config/helperFunctions.js";

dotenv.config();

export const signUpHandler = async (req, res) => {
  try {
    const { name, email, password, picUrl } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ msg: "Please Enter all the fields" });
      return;
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ mgs: "User already exist" });
      return;
    }

    const salt = bycrpt.genSaltSync(parseInt(process.env.bycrptSalt));
    const newPassword = await bycrpt.hash(password, salt);

    let user;
    if (picUrl) {
      user = await User.create({
        name,
        email,
        password: newPassword,
        pic: picUrl,
      });
    } else {
      user = await User.create({
        name,
        email,
        password: newPassword,
      });
    }

    if (user) {
      res.status(200).json({ msg: "User created successfully" });
    } else {
      res.status(400).json({ msg: "Failed to create new user" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "Error occured" });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bycrpt.compareSync(password, user.password)) {
      res.status(200).json({
        token: genrateToken(user._id),
      });
    } else {
      res.status(400).json({ status: "Enter corrent cridentials" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "Error occured" });
  }
};
