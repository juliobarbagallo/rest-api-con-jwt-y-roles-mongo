import Product from "../models/Product";

export const createProduct = async (req, res) => {
  const { name, price, description, image, category } = req.body;
  const product = new Product({ name, price, description, image, category });
  const result = await product.save();
  res.status(201).json(result);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json(product);
};

export const deleteProductById = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  res.status(200).json(product);
};
