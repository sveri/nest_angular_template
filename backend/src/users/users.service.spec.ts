import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one user if it exists', () => {
    return service.findOne('john').then(u => {
      expect(u.username).toBe('john');
    });
  });

  it('should return undefined if user does not exists', () => {
    return service.findOne('johnnnn').then(u => {
      expect(u).toBeUndefined();
    });
  });
});
