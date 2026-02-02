import ProductsForm from "@/components/productform";
import { Button } from "@/components/ui/button";
import { Activity, useState } from "react";

// Product validation schema

export default function Products() {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
        >
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      <Activity mode={showForm ? 'visible' : 'hidden'}>
        <ProductsForm />
      </Activity>
    </div>
  );
}
