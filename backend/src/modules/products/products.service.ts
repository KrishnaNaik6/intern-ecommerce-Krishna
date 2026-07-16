import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto/pagination-query.dto";
import { RedisService } from "src/common/redis/redis.service";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) { }

  async getProductById(id: number) {
    return await this.prisma.product.findFirst({ where: { id: id } })
  }

  async ensureProductExists(productId: number) {
    const existingProduct =
      await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

    if (existingProduct) {
      return existingProduct;
    }

    const data = await this.getProductById(productId);

    if (!data) {
      throw new NotFoundException(
        "Product not found",
      );
    }

    return this.prisma.product.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        images: data.images,
      },
    });
  }

  async getProducts(dto: PaginationQueryDto) {

    const { page, limit, search } = dto;
    const cacheKey = `products:${page}:${limit}:${search}`;

    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      console.log("Cache Hit");
      return JSON.parse(cached);
    }

    console.log("Cache Miss");

    const products = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        title: {
          contains: search,
          mode: "insensitive"
        }
      },
    })

    const total = await this.prisma.product.count({
      where: {
        title: {
          contains: search,
          mode: "insensitive"
        }
      }
    })

    await this.redisService.set(
      cacheKey,
      { products, total },
      Number(process.env.REDIS_TTL),

    );

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSuggestions(query: string) {
    return this.prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },

      select: {
        id: true,
        title: true,
      },

      take: 8,

      orderBy: {
        title: "asc",
      },
    });
  }
}

