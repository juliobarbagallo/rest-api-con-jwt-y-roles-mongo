import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.statics.matchPassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

export default model("User", userSchema);
