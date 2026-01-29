import { z } from "zod";

// Category type definition
export const categorySchema = z.object({
    id: z.string("Category ID is required"),
    name: z.string("Category name is required")
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name must be at most 50 characters"),
    description: z.string("Category description is required")
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be at most 500 characters"),
    slug: z.string("Category slug is required")
        .min(2, "Slug must be at least 2 characters")
        .max(50, "Slug must be at most 50 characters"),
    icon: z.string("Icon URL is required").optional(),
    parentCategoryId: z.string("Parent category ID").optional().nullable(),
    isActive: z.boolean("Status is required").default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Category = z.infer<typeof categorySchema>;


export const createCategorySchema = categorySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const selectCategorySchema = z.object({
    categoryId: z.string("Category ID is required"),
});

export type SelectCategoryInput = z.infer<typeof selectCategorySchema>;
