import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === email);
  }

  async createUser(email: string, password: string): Promise<User> {
    const newUser = {
      userId: this.users.length + 1,
      username: email,
      password: password,
    };
    this.users.push(newUser);
    return newUser;
  }
}
