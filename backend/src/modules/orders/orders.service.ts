import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService,
    ) { }

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

            return {
                message: "Order placed successfully",
                orderId: order.id,
            };
        });
    }
}
