import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsers: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsers,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsers.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await sendForgotPasswordEmail.execute({ email: 'jose@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jose@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsers.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await sendForgotPasswordEmail.execute({ email: 'jose@gmail.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// RED - GREEN - REFAC
