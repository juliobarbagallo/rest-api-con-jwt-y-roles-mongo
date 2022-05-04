import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
  },
  { timestamps: true, versionKey: false }
);

export default model("Product", productSchema);
