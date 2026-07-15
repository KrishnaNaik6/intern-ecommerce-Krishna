"use client";

import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageNumber } from "./page-number";

export function ProductGrid() {

  const route = useRouter();
  const {
    data,
    isPending,
    isError,
    error,
    refetch
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
      <div className="flex flex-col text-red-500 justify-center items-center">
        {(error as Error).message}
        <Button onClick={
          () => refetch()
        }>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <PageNumber
        page={data.page}
        totalPages={data.totalPages}
        onPageChange={(page) => route.push(`?page=${page}`)}
      />
    </div>
  );
}