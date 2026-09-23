import { Injectable, OnModuleInit } from '@nestjs/common';
import 'dotenv/config';
import { db } from './db.js';

@Injectable()
export class PrismaService implements OnModuleInit {
  private runtime: Awaited<ReturnType<typeof db.connect>>;

  async onModuleInit() {
    this.runtime = await db.connect({ url: process.env.DATABASE_URL! });
  }

  async onModuleDestroy() {
    await this.runtime.close();
  }

  async getOneUserByEmail(email: string) {
    const user = await db.orm.public.User.where({ email: email }).all();
    return user[0] || null;
  }

  async createUser(email: string, password: string) {
    return await db.orm.public.User.create({
      email: email,
      password: password,
      name: 'New User',
    });
  }

  async createProfileForUser(userId: string, profileName: string) {
    return await db.orm.public.Profile.create({
      userId: userId,
      profileName: profileName,
    });
  }

  async updateUser(
    newUserData: { password?: string; name?: string },
    userId: string,
  ) {
    const user = await this.getOneUserByEmail(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await db.orm.public.User.where({ id: userId }).update(newUserData);
  }
}
