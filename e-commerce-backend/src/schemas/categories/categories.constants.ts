import { Category } from "./category.types";

/**
 * Static Product Categories
 * Used for selecting product categories when adding/editing products
 * Add new categories here to extend available options
 */
export const PRODUCT_CATEGORIES: Category[] = [
    {
        id: "electronics",
        name: "Electronics",
        description: "Electronic devices, gadgets, and accessories for everyday use",
        slug: "electronics",
        icon: "📱",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "clothing",
        name: "Clothing",
        description: "Apparel, footwear, and fashion accessories for men, women, and children",
        slug: "clothing",
        icon: "👕",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "home-garden",
        name: "Home & Garden",
        description: "Furniture, decor, and gardening supplies for your home",
        slug: "home-garden",
        icon: "🏠",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "sports-outdoors",
        name: "Sports & Outdoors",
        description: "Sports equipment, outdoor gear, and recreational items",
        slug: "sports-outdoors",
        icon: "⚽",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "books-media",
        name: "Books & Media",
        description: "Books, audiobooks, movies, and digital media content",
        slug: "books-media",
        icon: "📚",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "beauty-health",
        name: "Beauty & Health",
        description: "Beauty products, wellness items, and health supplements",
        slug: "beauty-health",
        icon: "💄",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "toys-games",
        name: "Toys & Games",
        description: "Toys, board games, puzzles, and gaming accessories",
        slug: "toys-games",
        icon: "🎮",
        parentCategoryId: null,
        isActive: true,
    },
    {
        id: "food-beverages",
        name: "Food & Beverages",
        description: "Food items, snacks, beverages, and specialty products",
        slug: "food-beverages",
        icon: "🍔",
        parentCategoryId: null,
        isActive: true,
    },
];

/**
 * Get all active categories
 */
export const getActiveCategories = (): Category[] => {
    return PRODUCT_CATEGORIES.filter((cat) => cat.isActive);
};

/**
 * Get all product categries name
 */
export const getAllCategoryNames = (): string[] => {
    return PRODUCT_CATEGORIES.map((cat) => cat.name);
};

/**
 * Get category by ID
 */
export const getCategoryById = (categoryId: string): Category | undefined => {
    return PRODUCT_CATEGORIES.find((cat) => cat.id === categoryId);
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = (slug: string): Category | undefined => {
    return PRODUCT_CATEGORIES.find((cat) => cat.slug === slug);
};

/**
 * Get sub-categories (children of a parent category)
 */
export const getSubCategories = (parentCategoryId: string): Category[] => {
    return PRODUCT_CATEGORIES.filter((cat) => cat.parentCategoryId === parentCategoryId);
};

/**
 * Check if category exists
 */
export const categoryExists = (categoryId: string): boolean => {
    return PRODUCT_CATEGORIES.some((cat) => cat.id === categoryId);
};
