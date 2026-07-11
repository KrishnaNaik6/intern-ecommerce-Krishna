import { Product, ProductsResponse } from "../types/product";

export async function getProducts(): Promise<ProductsResponse> {
    const response = await fetch(
        "https://dummyjson.com/products",
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}