import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    ProductsModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
