import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/companydb")
  .then((db) => console.log("db connected"))
  .catch((error) => console.log(error));
