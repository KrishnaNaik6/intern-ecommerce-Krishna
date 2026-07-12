"use client";

import Image from "next/image";
import { useProduct } from "../hooks/use-product";
import { RatingStars } from "@/components/shared/rating-stars";
import { calculateOriginalPrice } from "@/lib/price";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";

interface ProductDetailsProps {
  id: number;
}

export function ProductDetails({ id }: ProductDetailsProps) {
  const {
    data: product,
    isPending,
    isError,
    error,
  } = useProduct(id);

  if (isPending) {
    return (
      <div className="py-20 text-center">
        Loading product...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  if (!product) return null;

  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Image */}
      <div>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="w-full rounded-xl border"
        />
      </div>

      {/* Details */}
      <div className="space-y-5">
        <p className="text-sm uppercase text-gray-500">
          {product.category}
        </p>

        <h1 className="text-4xl font-bold">
          {product.title}
        </h1>

        <RatingStars rating={product.rating} />

        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-green-600">
            ${product.price}
          </span>

          <span className="text-xl text-gray-400 line-through">
            ${originalPrice}
          </span>

          <span className="rounded bg-red-500 px-2 py-1 text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        </div>

        <p className="text-gray-600">
          {product.description}
        </p>

        <p className="font-medium">
          Stock:{" "}
          <span className="text-green-600">
            {product.stock}
          </span>
        </p>

        <AddToCartButton
          productId={product.id}
        />
      </div>
    </div>
  );
}