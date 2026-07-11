import Image from "next/image";
import Link from "next/link";

import { Product } from "../types/product";
import { RatingStars } from "@/components/shared/rating-stars";
import { calculateOriginalPrice } from "@/lib/price";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">

        {/* Product Image */}
        <div className="relative overflow-hidden">

          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={300}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* STEP 4 - Discount Badge */}
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {Math.round(product.discountPercentage)}% OFF
          </div>

        </div>

        <div className="space-y-3 p-4">

          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h2 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h2>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          {/* Rating */}
          <RatingStars rating={product.rating} />

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          </div>

          {/* STEP 5 - Stock Badge */}
          <span
            className={`text-sm font-medium ${
              product.stock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </span>

        </div>
      </div>
    </Link>
  );
}