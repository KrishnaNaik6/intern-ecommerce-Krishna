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

    @Get()
    async getProduct(
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