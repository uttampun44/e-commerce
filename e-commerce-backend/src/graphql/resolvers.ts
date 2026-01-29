import {
  getCategoryById,
  getActiveCategories,
  getAllCategoryNames,
} from "../schemas/categories/index.js";


export const resolvers = {
  Query: {
    // Get all active categories
    categories: (_: any, __: any, context: { user?: any }) => {
        if(!context.user) throw new Error("Unauthorized");
        
      return getActiveCategories();
    },

    // Get all product-categories names
    categoryNames: (_: any, __: any, context: { user?: any }) => {
        if(!context.user) throw new Error("Unauthorized");
      return getAllCategoryNames();
    },

    // Get category by ID
    category: (_: any, { id }: { id: string }, context: { user?: any }) => {
        if(!context.user) throw new Error("Unauthorized");
      return getCategoryById(id);
    },
  },
};
