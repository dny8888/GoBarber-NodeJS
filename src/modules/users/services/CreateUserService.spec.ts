import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsers: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsers, fakeHash);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('name');
    expect(user.name).toBe('José da Silva');
  });
  it('should be not able to create a User with an exist email', async () => {
    await createUser.execute({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await expect(
      createUser.execute({
        name: 'José da Silva',
        email: 'jose@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
