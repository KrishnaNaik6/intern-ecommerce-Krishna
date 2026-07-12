import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Cart, Prisma, Product } from "@prisma/client";

import { PrismaService } from "src/common/prisma/prisma.service";

import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart.dto";
import { HttpService } from "@nestjs/axios";

import { firstValueFrom } from "rxjs";
import { ProductsService } from "../products/products.service";
import { ApiResponse } from "src/common/interfaces/api-response.interceptor";

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly productsService: ProductsService
  ) { }

  private async ensureProductExists(productId: number) {
    const existing = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (existing) {
      return existing;
    }

    const { data } = await firstValueFrom(
      this.httpService.get<ApiResponse<Product>>(
        `https://dummyjson.com/products/${productId}`,
      ),
    );

    await this.prisma.product.create({
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

  async addItem(
    userId: string,
    dto: AddToCartDto,
  ) {
    await this.ensureProductExists(dto.productId);
    let cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem =
      await this.prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: dto.productId,
          },
        },
      });

    if (existingItem) {
      const item =
        await this.prisma.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: {
              increment: dto.quantity,
            },
          },
        });

      return {
        message: "Cart updated",
        item,
      };
    }

    const item =
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });

    return {
      message: "Product added to cart",
      item,
    };
  }

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!cart) {
      return {
        items: [],
        totalItems: 0,
      };
    }

    return {
      id: cart.id,
      items: cart.cartItems,
      totalItems: cart.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      totalPrice: cart.cartItems.reduce(
        (sum, item) =>
          sum + Number(item.product.price) * item.quantity,
        0,
      ),
    };
  }

  async updateQuantity(
    userId: string,
    productId: number,
    dto: UpdateCartItemDto,
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    const item = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException("Cart item not found");
    }

    return this.prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: dto.quantity,
      },
    });
  }

  async removeItem(
    userId: string,
    productId: number,
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    return {
      message: "Item removed successfully",
    };
  }
  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return {
      message: "Cart cleared",
    };
  }
}