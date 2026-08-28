import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new Error('User already exists');
    }

    // Post to DB
    const result = await this.usersService.createUser(email, password);
    console.log('User registered successfully:', result);
  }

  async loginUser(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    console.log('Login attempt for user:', username);
    const user = await this.usersService.findOne(username);
    if (!user || !(await this.isSamePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    // Implement refresh token logic here
    const storedRefreshToken = {
      id: '1',
      token: 'Some Token, then implement db',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };

    if (!storedRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const payload = { sub: decoded.sub, username: decoded.username };
      const newAccessToken = await this.jwtService.signAsync(payload);
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
