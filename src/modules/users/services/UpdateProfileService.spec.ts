import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'José da Silva Sauro',
      email: 'jose_sauro@gmail.com',
    });

    expect(updatedUser.name).toBe('José da Silva Sauro');
    expect(updatedUser.email).toBe('jose_sauro@gmail.com');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'Teste@gmail.com',
      password: '123456789',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'José da Silva',
        email: 'jose@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'José da Silva Sauro',
      email: 'jose_sauro@gmail.com',
      oldPassword: '123456789',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'José da Silva Sauro',
        email: 'jose_sauro@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'José da Silva Sauro',
        email: 'jose_sauro@gmail.com',
        oldPassword: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
