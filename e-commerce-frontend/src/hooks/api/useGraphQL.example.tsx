import { useGraphQL } from "@/hooks/api/useGraphQL";

// Define your GraphQL query


// Or as a string if you don't have @apollo/client:
const GET_PRODUCTS_STRING = `
  query GetProducts($categoryId: ID!) {
    products(categoryId: $categoryId) {
      id
      name
      price
      description
    }
  }
`;

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductsResponse {
  products: Product[];
}

export function ProductsList({ categoryId }: { categoryId: string }) {
  const { data, isLoading, error } = useGraphQL<ProductsResponse>(
    ["products", categoryId], // Query key for caching
    GET_PRODUCTS_STRING,
    {
      variables: { categoryId },
      onSuccess: (data) => {
        console.log("Products loaded:", data);
      },
      onError: (error) => {
        console.error("Failed to load products:", error);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {data?.products?.map((product: Product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
