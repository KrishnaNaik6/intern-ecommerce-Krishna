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
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  private buildAuthResponse(
    user: ResponseDto,
    tokens: {
      accessToken: string;
      refreshToken: string;
    },
  ): AuthResponse {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  private async generateAccessToken(
    payload: JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get(
        'JWT_ACCESS_EXPIRES_IN',
      ),
    });
  }

  private async generateRefreshToken(
    payload: JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get(
        'JWT_REFRESH_EXPIRES_IN',
      ),
    });
  }

  private async generateTokens(user: ResponseDto) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

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

    const passwordHash = await this.hashPassword(
      registerDto.password,
    );

    const user = await this.usersService.create({
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
