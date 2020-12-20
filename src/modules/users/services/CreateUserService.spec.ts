import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsers, fakeHash);

    const user = await createUser.execute({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('name');
    expect(user.name).toBe('José da Silva');
  });
  it('should be not able to create a User with an exist email', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsers, fakeHash);

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
