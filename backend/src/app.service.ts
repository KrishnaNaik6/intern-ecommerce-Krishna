import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prism:PrismaService){}
  getHello(): string {
    return 'Hello World!';
  }

}
