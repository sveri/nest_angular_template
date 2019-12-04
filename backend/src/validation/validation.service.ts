import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserClean } from '../users/users.service';

@Injectable()
export class ValidationService {

  async validateUser(
    pass: string,
    userFromBackend: User
  ): Promise<UserClean | null> {

    if (userFromBackend?.password === pass) {
      const { password, ...result } = userFromBackend;
      return result;
    }
    return null;
  }
}
