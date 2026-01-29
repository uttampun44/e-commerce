import ProductsForm from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Product validation schema

export default function Products() {
  const [showForm, setShowForm] = useState(false);



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm ? (
        <ProductsForm />
      ) : null}
    </div>
  );
}
