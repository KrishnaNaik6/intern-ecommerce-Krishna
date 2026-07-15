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

    // const { data } = await firstValueFrom(
    //   this.httpService.get<ApiResponse<Product>>(
    //     `https://dummyjson.com/products/${productId}`,
    //   ),
    // )
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

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.title = {
        contains: search,
      };
    }
    const products = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
    })

    const total = await this.prisma.product.count({
      where: {
        title: {
          contains: search
        }
      }
    })
    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}