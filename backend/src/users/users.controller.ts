import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test-get')
  async testGet() {
    return this.usersService.findOne('mail@mail.com');
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async testGuard() {
    return 'Can access this route';
  }

  @Post('test-create')
  async testCreate(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.usersService.createUser(email, password);
  }
}
