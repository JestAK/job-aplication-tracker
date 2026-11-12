import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { jwtConstants } from './constants.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async encodePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async isSamePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async registerUser(email: string, password: string): Promise<any> {
    // Check if the user already exists
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    // Post to DB
    const result = await this.usersService.createUser(email, password);
    if (!result) {
      throw new InternalServerErrorException('User registration failed');
    }
    console.log('User registered successfully:', result);
  }

  async loginUser(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    console.log('Login attempt for user:', username);
    const user = await this.usersService.findOneByEmail(username);
    if (!user || !(await this.isSamePassword(pass, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    //TODO: Implement role-based access control and include roles in the payload
    const payload = { sub: user.userId, username: user.username, role: 'user' };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '15m',
      }),
      refresh_token: await this.jwtService.signAsync(
        { sub: user.userId, type: 'refresh' },
        {
          secret: jwtConstants.refreshSecret,
          expiresIn: '7d',
        },
      ),
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const storedRefreshToken =
      await this.prismaService.getRefreshToken(refreshToken);

    if (!storedRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    if (new Date(storedRefreshToken.expiresAt) < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const userId = decoded.sub;
      const user = await this.usersService.findOneById(userId);
      const payload = {
        sub: user.userId,
        username: user.username,
        role: 'user',
      };
      const newAccessToken = await this.jwtService.signAsync(payload);
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async isRefreshTokenValid(refreshToken: string): Promise<boolean> {
    const storedRefreshToken =
      await this.prismaService.getRefreshToken(refreshToken);

    if (!storedRefreshToken) {
      return false;
    }

    if (new Date(storedRefreshToken.expiresAt) < new Date()) {
      return false;
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
