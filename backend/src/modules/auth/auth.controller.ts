import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() LoginDto:LoginDto) {
    return this.authService.login(LoginDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(
    @CurrentUser() user: {
      id: string;
      email: string;
      role: string;
    },
  ){
    return user;
  }
}
