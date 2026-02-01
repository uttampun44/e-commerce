import { Request, Response } from "express";
import { Product } from "@/models/Product.js";
import { createProduct, updateProduct as updateProductService } from "@/schemas/products/products.constant.js";
import { createProductSchema, updateProductSchema } from "@/schemas/products/product.types.js";

// Create a new product
export const createProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body with Zod
    const { name, description, price, stock, categoryId, sku, image } = createProductSchema.parse(req.body);

    const newProduct = await createProduct({ name, description, price, stock, categoryId, sku, image });
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: (error as Error).message,
    });
  }
};

// Get all products
export const getProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: (error as Error).message,
    });
  }
};

// Get product by ID
export const getProductByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: (error as Error).message,
    });
  }
};

// Update product
export const updateProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate request body with Zod
    const validatedData = updateProductSchema.parse({ ...req.body, id });
    const { name, description, price, stock, categoryId, sku, image } = validatedData;

    const updatedProduct = await updateProductService({ id, name, description, price, stock, categoryId, sku, image });
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: (error as Error).message,
    });
  }
};

// Delete product (soft delete)
export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: (error as Error).message,
    });
  }
};
