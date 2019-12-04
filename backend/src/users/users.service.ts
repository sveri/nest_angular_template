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
}
