import User from "../models/User";
import Role from "../models/Role";
import config from "../config";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, password, email, roles } = req.body;

  const newUser = new User({
    username,
    password: await User.encryptPassword(password),
    email,
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  console.log(savedUser);

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
  const { username, password, email } = req.body;
  const userFound = await User.findOne({ email }).populate("roles");

  if (!userFound) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordValid = await User.matchPassword(
    password,
    userFound.password
  );
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ token: null, message: "Password is not valid" });
  }

  jwt.sign(
    { id: userFound._id },
    config.SECRET,
    { expiresIn: 86400 },
    (err, token) => {
      res.status(200).json({
        token,
        user: {
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          roles: userFound.roles,
        },
      });
    }
  );
};
