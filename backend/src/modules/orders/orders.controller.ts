import {
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";

import { OrdersService } from "./orders.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

import type { CurrentUserData } from "../auth/interfaces/current-user.interface";

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async placeOrder(
    @CurrentUser() user: CurrentUserData,
  ) {
    const result =
      await this.ordersService.placeOrder(
        user.id,
      );

    return {
      success: true,
      message: result.message,
      data: {
        orderId: result.orderId,
      },
    };
  }
}