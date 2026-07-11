import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';

import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) { }

  async register(
    registerDto: RegisterDto,
  ): Promise<AuthResponse> {
    const existingUser =
      await this.usersService.findByEmail(
        registerDto.email,
      );

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const passwordHash =
      await this.hashPassword(
        registerDto.password,
      );

    const user =
      await this.usersService.create({
        name: registerDto.name,
        email: registerDto.email,
        passwordHash,
      });

    const tokens = await this.generateTokens(user);

    return this.buildAuthResponse(
      user,
      tokens,
    );
  }

  //login 
  async login(
    loginDto: LoginDto,
  ): Promise<AuthResponse> {
    const user =
      await this.validateUser(
        loginDto.email,
        loginDto.password,
      );

    const tokens =
      await this.generateTokens(user);

    return this.buildAuthResponse(
      user,
      tokens,
    );
  }

}
