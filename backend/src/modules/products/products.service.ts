import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Prisma, Product } from "@prisma/client";

import { PrismaService } from "src/common/prisma/prisma.service";
import { ApiResponse } from "src/common/interfaces/api-response.interceptor";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto/pagination-query.dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) { }

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

    const { data } = await firstValueFrom(
      this.httpService.get<ApiResponse<Product>>(
        `https://dummyjson.com/products/${productId}`,
      ),
    );

    if (!data) {
      throw new NotFoundException(
        "Product not found",
      );
    }

    return this.prisma.product.create({
      data: {
        id: data.data.id,
        title: data.data.title,
        description: data.data.description,
        price: new Prisma.Decimal(data.data.price),
        discountPercentage: data.data.discountPercentage,
        rating: data.data.rating,
        stock: data.data.stock,
        brand: data.data.brand,
        category: data.data.category,
        thumbnail: data.data.thumbnail,
        images: data.data.images,
      },
    });
  }

  async getProducts(dto: PaginationQueryDto) {

    const { page, limit } = dto;

    const data = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await this.prisma.product.count()
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}