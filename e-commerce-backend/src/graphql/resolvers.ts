import {
  getCategoryById,
  getActiveCategories,
  getAllCategoryNames,
} from "../schemas/categories/index.js";


export const resolvers = {
  Query: {
    // Get all active categories
    categories: () => {
      return getActiveCategories();
    },

    // Get all product-categories names
    categoryNames: () => {
      return getAllCategoryNames();
    },

    // Get category by ID
    category: (_: any, { id }: { id: string }) => {
      return getCategoryById(id);
    },
  },
};
