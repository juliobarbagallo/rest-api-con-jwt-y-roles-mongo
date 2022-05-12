import { ROLES } from "../models/Role";
import { User } from "../models/User";

export const checkDuplicatedUserOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "User already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "Email already exists" });

  next();
};

export const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = o; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .json({ message: `Role ${req.body.roles[i]} does not exist` });
      }
    }
  }
  next();
};
