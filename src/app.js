import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./libs/init";
import productRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
createRoles();
app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

export default app;
