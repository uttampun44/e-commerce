import { usePost } from "@/hooks/api/usePost";
import { useGraphQL } from "@/hooks/api/useGraphQL";
import { productSchema, type ProductFormData } from "@/schemas/productCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface Category {
  id: string;
  name: string;
}

const GET_CATEGORIES_QUERY = `
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default function ProductsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Fetch categories from GraphQL
  const { data: categoriesResponse, isLoading: categoriesLoading } = useGraphQL<{ categories: Category[] }>(
    ["categories"],
    GET_CATEGORIES_QUERY,
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return new Error("Failed to load categories: " + (error as Error).message);
      },
    }
  );

  const categories = categoriesResponse?.categories || [];

  const { mutate: createProduct, isPending } = usePost("/products", {
    onSuccess: () => {
      reset();
      alert("Product created successfully!");
    },
    onError: (error) => {
      alert(error.response?.data || "Failed to create product");
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    createProduct(data);
  };
  return (
   <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
          <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>
              <Input
                placeholder="Enter product name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                {...register("description")}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <Input
                  type="number"
                  placeholder="0"
                  {...register("stock", { valueAsNumber: true })}
                  className={errors.stock ? "border-red-500" : ""}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select>
                <SelectTrigger className="w-full border" disabled={categoriesLoading}>
                  <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <Input
                placeholder="e.g., PROD-001"
                {...register("sku")}
                className={errors.sku ? "border-red-500" : ""}
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sku.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </div>
    );  
}