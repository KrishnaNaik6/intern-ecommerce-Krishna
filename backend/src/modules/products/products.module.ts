import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { ProductsService } from "./products.service";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    HttpModule,
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }