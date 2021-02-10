// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joao@gmail.com',
      password: '123456789',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'José da Silva Sauro',
      email: 'jose_sauro@gmail.com',
      password: '123456789',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
