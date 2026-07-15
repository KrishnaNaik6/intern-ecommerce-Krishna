import { Product } from "@prisma/client";

export class ProductRespnseDto {
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}