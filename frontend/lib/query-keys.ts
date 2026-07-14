export const QUERY_KEYS = {
    PRODUCTS: ["products"],
    PRODUCT: (id: number) => ["product", id],

    CART: ["cart"],

    ORDERS: ["orders"],

    ORDER: (id: string) => ["order", id],

    ME: ["me"],
};