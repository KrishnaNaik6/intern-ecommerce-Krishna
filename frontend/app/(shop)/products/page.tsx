import { ProductGrid } from "@/features/products/components/product-grid";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <ProductGrid />
    </div>
  );
}