import User from "../models/userModel.js";

export const userHandler = async (req, res) => {
  try {
    const { name, followers, following, pic } = req.user;
    res.status(200).json({
      user_name: name,
      profile_pic: pic,
      followers: followers.length,
      following: following.length,
    });
  } catch (e) {
    res.status(400).json({ msg: "Error occured" });
    console.log(e);
  }
};

export const followHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const followerAdded = await User.findByIdAndUpdate(userId, {
      $push: {
        followers: req.user.id,
      },
    });

    const followingAdded = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        following: userId,
      },
    });

    if ((followerAdded, followingAdded)) {
      res.status(200).json({ msg: "User followed Succeesfully" });
    } else {
      res.status(400).json({ msg: "User not followed " });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const unFollowHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const followerRemoved = await User.findByIdAndUpdate(userId, {
      $pull: {
        followers: req.user.id,
      },
    });

    const followingRemove = await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        following: userId,
      },
    });

    if ((followerRemoved, followingRemove)) {
      res.status(200).json({ msg: "User unfollowed Succeesfully" });
    } else {
      res.status(400).json({ msg: "User not unfollowed " });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};
