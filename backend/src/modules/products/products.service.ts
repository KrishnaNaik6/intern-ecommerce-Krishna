import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Prisma } from "@prisma/client";

import { PrismaService } from "src/common/prisma/prisma.service";

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
      this.httpService.get(
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
        id: data.id,
        title: data.title,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        discountPercentage:
          data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        images: data.images,
      },
    });
  }
}