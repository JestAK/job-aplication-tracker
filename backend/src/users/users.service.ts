import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.prismaService.getOneUserByEmail(email);
  }

  async createUser(email: string, password: string): Promise<User> {
    const newUser = await this.prismaService.createUser(email, password);
    const profile = await this.prismaService.createProfileForUser(
      newUser.id,
      'New Profile',
    );
    return newUser;
  }

  async changeUsername(userId: string, newUsername: string): Promise<User> {
    return await this.prismaService.updateUser({ name: newUsername }, userId);
  }

  async createProfile(userId: string, profileName: string): Promise<any> {
    return await this.prismaService.createProfileForUser(userId, profileName);
  }
}
