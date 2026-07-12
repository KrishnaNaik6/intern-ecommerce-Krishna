import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CartService } from "./cart.service";

import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart.dto"; 

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

import type { CurrentUserData } from "../auth/interfaces/current-user.interface";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Post("items")
  async addItem(
    @CurrentUser() user: CurrentUserData,
    @Body() dto: AddToCartDto,
  ) {
    const result = await this.cartService.addItem(
      user.id,
      dto,
    );

    return {
      success: true,
      message: result.message,
      data: result.item,
    };
  }

  @Get()
  async getCart(
    @CurrentUser() user: CurrentUserData,
  ) {
    const cart =
      await this.cartService.getCart(user.id);

    return {
      success: true,
      data: cart,
    };
  }

  @Patch("items/:productId")
  async updateQuantity(
    @CurrentUser() user: CurrentUserData,
    @Param("productId", ParseIntPipe)
    productId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    const item =
      await this.cartService.updateQuantity(
        user.id,
        productId,
        dto,
      );

    return {
      success: true,
      message: "Quantity updated",
      data: item,
    };
  }

  @Delete("items/:productId")
  async removeItem(
    @CurrentUser() user: CurrentUserData,
    @Param("productId", ParseIntPipe)
    productId: number,
  ) {
    const result =
      await this.cartService.removeItem(
        user.id,
        productId,
      );

    return {
      success: true,
      message: result.message,
    };
  }

  @Delete("clear")
  async clearCart(
    @CurrentUser() user: CurrentUserData,
  ) {
    const result =
      await this.cartService.clearCart(user.id);

    return {
      success: true,
      message: result.message,
    };
  }
}