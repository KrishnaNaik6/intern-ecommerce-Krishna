export const ROUTES = {
    HOME: "/",
    PRODUCTS: "/products",
    PRODUCT: (id: number | string) => `/products/${id}`,

    CART: "/cart",

    ORDERS: "/orders",
    ORDER: (id: string) => `/orders/${id}`,

    LOGIN: "/auth/login",
    REGISTER: "/auth/register",

    PROFILE: "/profile",
} as const;