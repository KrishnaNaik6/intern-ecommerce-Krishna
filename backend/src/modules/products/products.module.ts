import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { ProductsService } from "./products.service";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { ProductController } from "./product.controller";

@Module({
  imports: [
    PrismaModule,
    HttpModule,
  ],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }