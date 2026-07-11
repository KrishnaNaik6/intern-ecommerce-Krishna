import { Prisma } from "@prisma/client";
import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

interface DummyProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    thumbnail: string;
    images: string[];
}

interface DummyProductsResponse {
    products: DummyProduct[];
}

async function main() {
    console.log("Starting database seed...");

    const response = await fetch("https://dummyjson.com/products?limit=30");

    const data: DummyProductsResponse = await response.json();

    console.log(`Found ${data.products.length} products`);

    for (const product of data.products) {
        const productData = {
            title: product.title,
            description: product.description,
            price: new Prisma.Decimal(product.price),
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand ?? null,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
        };

        await prisma.product.upsert({
            where: {
                id: product.id,
            },
            update: productData,
            create: {
                id: product.id,
                ...productData,
            },
        });
    }

    console.log(`Successfully seeded ${data.products.length} products`);
}

main()
    .catch((error) => {
        console.error("Seed failed");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });