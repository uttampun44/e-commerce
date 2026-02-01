import { Product } from "../../models/Product.js";

export const createProduct = async (data: any): Promise<any> => {
  try {
    const newProduct = new Product({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      sku: data.sku,
      image: data.image || null,
      isActive: data.isActive !== false,
    });

    const savedProduct = await newProduct.save();
    return savedProduct.toObject();
  } catch (error) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};

export const updateProduct = async (data: any): Promise<any> => {
  try {
    const { id, ...updateData } = data;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct.toObject();
  } catch (error) {
    throw new Error(`Failed to update product: ${(error as Error).message}`);
  }
};