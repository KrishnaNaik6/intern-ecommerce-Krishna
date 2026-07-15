import { Controller, Get, Param, ParseIntPipe, Query, Search, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { ProductsService } from "./products.service";
import { query } from "axios";

@Controller("products")
@UseInterceptors(ResponseInterceptor)
export class ProductController {
    constructor(
        private readonly productService: ProductsService,
    ) { }

    @Get("suggestions")
    async getSuggestions(@Query("query") query: string) {
        const suggestions = await this.productService.getSuggestions(query);
        return suggestions
    }

    @Get("/:id")
    async getProduct(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.getProductById(id);
        return product
    }

    @Get()
    async getProducts(
        @Query("page", ParseIntPipe) page: number,
        @Query("limit", ParseIntPipe) limit: number,
        @Query("search") search: string,
    ) {
        const products = await this.productService.getProducts(
            { page, limit, search },
        );
        return {
            message: "Products fetched successfully",
            data: products,
        }
    }
}