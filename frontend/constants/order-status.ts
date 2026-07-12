export const ORDER_STATUS = {
    PENDING: "PENDING",
    PLACED: "PLACED",
    PAID: "PAID",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
} as const;

export type OrderStatus =
    (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];