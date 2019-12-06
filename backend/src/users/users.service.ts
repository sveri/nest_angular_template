import * as bcrypt from 'bcryptjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export type UserClean = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    userRepository.findOne({ email: 'admin@localhost.de' }).then(u => {
      if (!u) {
        userRepository.save(new User('admin@localhost.de', 'john'));
      }
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async registerUser(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // eslint-disable-next-line require-atomic-updates
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async userExists(user: User): Promise<User> {
    return await this.userRepository.findOne({ email: user.email });
  }
}
