"use client";

import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useProducts();

  if (isPending) {
    return (
      <div className="py-20 text-center">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}