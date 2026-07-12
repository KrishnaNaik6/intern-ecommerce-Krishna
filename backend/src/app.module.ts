import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule,

    ConfigModule.forRoot({
      isGlobal:true,
    }),

    CartModule,

    ProductsModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
