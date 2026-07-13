export const ROUTES = {
    HOME: "/",
    PRODUCTS: "/products",
    PRODUCT: (id: number | string) => `/products/${id}`,

    CART: "/cart",

    ORDERS: "/orders",
    ORDER: (id: string) => `/orders/${id}`,

    LOGIN: "/login",
    REGISTER: "/auth/register",

    PROFILE: "/profile",

    CHECKOUT: "/checkout"
} as const;