import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto.js';
import { LoginUserDto } from './dto/LoginUser.dto.js';
import { AuthService } from './auth.service.js';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.authService.loginUser(email, password);
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { email, password } = createUserDto;
    const encryptedPassword = await this.authService.encodePassword(password);
    let access_token: { access_token: string };
    let refresh_token: { refresh_token: string };
    try {
      await this.authService.registerUser(email, encryptedPassword);
      try {
        const tokens = await this.authService.loginUser(email, password);
        access_token = { access_token: tokens.access_token };
        refresh_token = { refresh_token: tokens.refresh_token };
      } catch (error) {
        return {
          message: 'Error logging in after registration',
          error: error.message,
        };
      }
      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return { access_token };
    } catch (error) {
      return { message: 'Error registering user', error: error.message };
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    console.log('Refresh token attempt:', refreshToken);
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (error) {
      return { message: 'Error refreshing token', error: error.message };
    }
  }
}
