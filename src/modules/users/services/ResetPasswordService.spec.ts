import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsers: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsers,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsers.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({ password: '1111111', token });
    const updatedUser = await fakeUsers.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('1111111');
    expect(updatedUser?.password).toBe('1111111');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '1111111',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-token',
    );
    await expect(
      resetPassword.execute({
        password: '1111111',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsers.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ password: '1111111', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// hash
// 2h expiração
// user inesistente
// userToken inexistente
