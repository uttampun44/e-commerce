import { z } from 'zod';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z
    .string("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must be at most 100 characters"),
  
  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  
  price: z
    .number("Price must be a number")
    .positive("Price must be greater than 0"),
  
  stock: z
    .number("Stock must be a number")
    .nonnegative("Stock cannot be negative"),
  
  categoryId: z
    .string("Category is required")
    .min(1, "Please select a category"),
  
  sku: z
    .string("SKU is required")
    .min(3, "SKU must be at least 3 characters"),
});

export type ProductFormData = z.infer<typeof productSchema>;
