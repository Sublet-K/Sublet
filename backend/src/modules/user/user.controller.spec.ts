import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbModule } from '../mongodb/mongodb.module';
import { CacheModule } from '@nestjs/cache-manager';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule, CacheModule.register()],
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
