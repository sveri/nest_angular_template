import { User, UserClean, UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly validationService: ValidationService,
    private readonly jwtService: JwtService,
  ) { }
  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserClean | null> {
    const user = await this.usersService.findOne(username);
    return this.validationService.validateUser(pass, user);
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
