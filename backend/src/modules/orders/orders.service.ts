import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService,
    ) { }

    async getOrders(userId: string) {
        return this.prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                OrderItems: {
                    include: {
                        Product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getOrderById(
        userId: string,
        orderId: string,
    ) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
                userId,
            },
            include: {
                OrderItems: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        if (!order) {
            throw new NotFoundException(
                "Order not found",
            );
        }

        return order;
    }

    async placeOrder(userId: string) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                userId,
            },
            include: {
                cartItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart || cart?.cartItems?.length === 0) {
            throw new BadRequestException(
                "Cart is empty",
            );
        }

        const totalAmount = cart.cartItems.reduce(
            (total, item) =>
                total +
                Number(item.product.price) * item.quantity,
            0,
        );

        return this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                },
            });

            await tx.orderItem.createMany({
                data: cart.cartItems.map((item) => ({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            });

            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                },
            });
            const createdOrder = await tx.order.findUnique({
                where: {
                    id: order.id,
                },
                include: {
                    OrderItems: {
                        include: {
                            Product: true,
                        },
                    },
                },
            });

            return createdOrder;
        });
    }
}