import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    service = new ValidationService();
  });

  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [UsersService],
  //     }).compile();

  //     service = module.get<UsersService>(UsersService);
  //   });

  it('should validate if pass is correct', () => {
    return service
      .validateUser('john', { username: 'john', password: 'john', userId: 1 })
      .then(u => {
        expect(u.username).toBe('john');
      });
  });

  it('should be invalid if pass is incorrect', () => {
    return service
      .validateUser('john', { username: 'john', password: 'johnn', userId: 1 })
      .then(u => {
        expect(u).toBeNull();
      });
  });
});
