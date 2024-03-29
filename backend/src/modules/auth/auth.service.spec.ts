import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { MongodbModule } from '../mongodb/mongodb.module';
import { CacheModule } from '@nestjs/cache-manager';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MongodbModule, CacheModule.register()],
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
