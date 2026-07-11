"use client";

import { useProduct } from "../hooks/use-product";

interface Props {
  id: number;
}

export function ProductDetails({ id }: Props) {
  const {
    data: product,
    isPending,
    isError,
    error,
  } = useProduct(id);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        {(error as Error).message}
      </p>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {product.title}
      </h1>

      <p>{product.description}</p>
    </div>
  );
}