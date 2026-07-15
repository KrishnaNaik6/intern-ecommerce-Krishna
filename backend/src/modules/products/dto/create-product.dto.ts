import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    discountPercentage: number;

    @IsNumber()
    rating: number;

    @IsNumber()
    stock: number;

    @IsString()
    brand: string;

    @IsString()
    category: string;

    @IsString()
    thumbnail: string;

    @IsString()
    images: string;
}