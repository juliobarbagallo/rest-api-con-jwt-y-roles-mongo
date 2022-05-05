import User from "../models/User";
import config from "../config";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, password, email, roles } = req.body;
  const newUser = new User({
    username,
    password: await User.encryptPassword(password),
    email,
  });

  const savedUser = await newUser.save();

  jwt.sign(
    { id: savedUser._id },
    config.SECRET,
    { expiresIn: 86400 },
    (err, token) => {
      res.status(200).json({
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          roles: savedUser.roles,
        },
      });
    }
  );
};

export const signIn = async (req, res) => {
  res.json("signin");
};
