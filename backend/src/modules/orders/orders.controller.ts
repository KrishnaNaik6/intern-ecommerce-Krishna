import {
    Controller,
    Get,
    Post,
    UseGuards,
    Param
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
    ) { }

    @Get()
    async getOrders(
        @CurrentUser() user: CurrentUserData,
    ) {
        return {
            success: true,
            data: await this.ordersService.getOrders(
                user.id,
            ),
        };
    }

    @Get(":id")
    async getOrder(
        @CurrentUser() user: CurrentUserData,
        @Param("id") id: string,
    ) {
        return {
            success: true,
            data: await this.ordersService.getOrderById(
                user.id,
                id,
            ),
        };
    }

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