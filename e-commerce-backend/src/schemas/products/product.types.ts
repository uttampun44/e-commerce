
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

  image: z
    .any()
    .optional()
    .refine((files) => {
      if (!files) return true; // Allow optional
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => {
        if (!files) return true; // Allow optional
        return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
      },
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string("Product ID is required"),
});

