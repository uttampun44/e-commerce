import {
  getCategoryById,
  getActiveCategories,
  getAllCategoryNames,
} from "../schemas/categories/index.js";


// GraphQL resolvers is functions to fetch or manipulate data for each defined query or mutation
// They map to the type definitions in typeDefs.ts

export const resolvers = {
  Query: {
    // Get all active categories - PUBLIC QUERY
    categories: (_: any, __: any, context: { user?: any }) => {
      return getActiveCategories();
    },

    // Get all product-categories names - PROTECTED QUERY
    categoryNames: (_: any, __: any, context: { user?: any }) => {
        if(!context.user) throw new Error("Unauthorized");
      return getAllCategoryNames();
    },

    // Get category by ID - PROTECTED QUERY
    category: (_: any, { id }: { id: string }, context: { user?: any }) => {
        if(!context.user) throw new Error("Unauthorized");
      return getCategoryById(id);
    },
  },
};
