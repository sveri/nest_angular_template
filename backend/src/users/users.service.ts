import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password: string;
}

export type UserClean = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'john',
      },
      {
        userId: 2,
        username: 'mark',
        password: 'mark',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
