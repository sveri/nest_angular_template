import * as bcrypt from 'bcryptjs';

import { UserClean, UsersService } from '../users/users.service';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserClean | null> {
    const user = await this.usersService.findOne(username);
    return this.validateUserPassword(pass, user);
  }

  async validateUserPassword(pass: string, userFromBackend: User): Promise<UserClean | null> {
    if (userFromBackend?.password && bcrypt.compare(userFromBackend.password, pass)) {
      const { password, ...result } = userFromBackend;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
