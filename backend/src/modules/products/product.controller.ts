import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { ProductsService } from "./products.service";

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
    ) {
        const products = await this.productService.getProducts({ page, limit });
        return {
            message: "Products fetched successfully",
            data: products,
        }
    }
}