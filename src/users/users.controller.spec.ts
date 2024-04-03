import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: string) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'test',
        });
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 'test', email, password: 'test' }]);
      },
      remove: (id: string) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'test',
        });
      },
      update: (id: string, { email, password }) => {
        return Promise.resolve({ id, email, password });
      },
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 'test', email, password });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser method', async () => {
    const user = await controller.findUser('dfdsfds');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin update session object and returns user', async () => {
    const session = { userId: 1 };
    const user = await controller.signInnUser(
      {
        email: 'test@test.com',
        password: 'test',
      },
      session,
    );

    expect(user.id).toEqual('test');
    expect(session.userId).toEqual(1);
  });
});
