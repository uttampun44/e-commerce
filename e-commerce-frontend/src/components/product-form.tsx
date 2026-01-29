import { usePost } from "@/hooks/api/usePost";
import { productSchema, type ProductFormData } from "@/schemas/productCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";


const CATEGORIES = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home-garden", name: "Home & Garden" },
  { id: "sports-outdoors", name: "Sports & Outdoors" },
  { id: "books-media", name: "Books & Media" },
  { id: "beauty-health", name: "Beauty & Health" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "food-beverages", name: "Food & Beverages" },
];


export default function ProductsForm() {
      const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

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
   <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-2xl">
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
                <SelectTrigger className="w-full border">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CATEGORIES.map((category) => (
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