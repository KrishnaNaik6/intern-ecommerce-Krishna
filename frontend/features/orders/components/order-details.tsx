"use client";

import { Order } from "../types/order";

import { OrderItemCard } from "./order-item";
import { OrderStatus } from "./order-status";

interface Props {
  order: Order;
}

export function OrderDetails({
  order,
}: Props) {
  return (
    <div className="space-y-8">

      <div className="rounded-xl border p-6">

        <div className="flex justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Order #{order.id.slice(0, 8)}
            </h1>

            <p className="text-muted-foreground">
              {new Date(
                order.createdAt,
              ).toLocaleString()}
            </p>

          </div>

          <OrderStatus status={order.status} />

        </div>

      </div>

      <div className="space-y-4">

        {order.OrderItems.map((item) => (
          <OrderItemCard
            key={item.id}
            item={item}
          />
        ))}

      </div>

      <div className="rounded-xl border p-6">

        <div className="flex justify-between">

          <span>Total</span>

          <span className="font-bold text-xl">
            $
            {Number(
              order.totalAmount,
            ).toFixed(2)}
          </span>

        </div>

      </div>

    </div>
  );
}