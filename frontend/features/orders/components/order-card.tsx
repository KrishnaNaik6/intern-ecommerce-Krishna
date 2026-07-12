"use client";

import Link from "next/link";

import { Order } from "../types/order";
import { OrderStatus } from "./order-status";

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  return (
    <Link
      href={`/orders/${order.id}`}
      className="block rounded-xl border p-6 hover:bg-muted/30 transition"
    >
      <div className="flex items-center justify-between">

        <div>
          <h2 className="font-semibold">
            Order #{order.id.slice(0, 8)}
          </h2>

          <p className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <OrderStatus status={order.status} />
      </div>

      <div className="mt-4 flex justify-between">
        <span>
          {order.OrderItems.length} item(s)
        </span>

        <span className="font-bold">
          ${Number(order.totalAmount).toFixed(2)}
        </span>
      </div>
    </Link>
  );
}