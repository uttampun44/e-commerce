import { gql } from "graphql-tag";

// GraphQL type definitions for Category entity and related queries
export const typeDefs = gql`
  type Category {
    id: String!
    name: String!
    description: String!
    slug: String!
    icon: String
    parentCategoryId: String
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }
  
  type Product {
    id: String!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    categoryId: String!
    sku: String!
    image: String!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    # Get all active categories
    categories: [Category!]!
    
    # Get all product-categories names
    categoryNames: [String!]!

    # Get category by ID
    category(id: String!): Category
  }

  type Mutation {
    # Create a new Product
    createProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      categoryId: String!
      sku: String!
      image: String
    ): Product!

    # Update an existing product
    updateProduct(
      id: String!
      name: String
      description: String
      price: Float
      stock: Int
      sku: String
    ): Product!
  }
`;
