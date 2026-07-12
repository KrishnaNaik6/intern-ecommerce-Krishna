"use client";

import Image from "next/image";

import { OrderItem } from "../types/order";

interface Props {
    item: OrderItem;
}

export function OrderItemCard({
    item,
}: Props) {
    return (
        <div className="flex gap-6 rounded-xl border p-4">

            <Image
                src={item.Product.thumbnail}
                alt={item.Product.title}
                width={100}
                height={100}
                className="rounded-lg"
            />

            <div className="flex-1">

                <h2 className="font-semibold">
                    {item.Product.title}
                </h2>

                <p className="text-muted-foreground">
                    {item.Product.brand}
                </p>

                <p>
                    Quantity: {item.quantity}
                </p>

            </div>

            <div className="text-right">

                <p>
                    ${Number(item.price).toFixed(2)}
                </p>

                <p className="font-bold">
                    $
                    {(
                        Number(item.price) *
                        item.quantity
                    ).toFixed(2)}
                </p>

            </div>

        </div>
    );
}