"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";
import { OrderList } from "@/features/orders/components/order-list";
import { ProtectedRoute } from "@/components/auth/potected-route";

export default function OrdersPage() {
  const {
    data: orders,
    isPending,
    isError,
    error,
  } = useOrders();

  if (isPending) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {
        !orders?.length ? (
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold">
              No Orders Yet
            </h1>

            <p className="mt-2 text-muted-foreground">
              Your completed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold">
              No Orders Yet
            </h1>

            <p className="mt-2 text-muted-foreground">
              Your completed orders will appear here.
            </p>
          </div>
        )

      }
    </ProtectedRoute>
  )
}
// if (!orders?.length) {
//   return (
//     <div className="py-20 text-center">
//       <h1 className="text-3xl font-bold">
//         No Orders Yet
//       </h1>

//       <p className="mt-2 text-muted-foreground">
//         Your completed orders will appear here.
//       </p>
//     </div>
//   );
// }

// return (
//   <div className="space-y-6">
//     <h1 className="text-3xl font-bold">
//       My Orders
//     </h1>

//     <OrderList orders={orders} />
//   </div>
// );