import { Order } from "../types/order";
import { OrderCard } from "./order-card";

interface Props {
  orders: Order[];
}

export function OrderList({ orders }: Props) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}