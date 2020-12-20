import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/DiskStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update User avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const fakeStorage = new FakeStorageProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorage,
    );

    const user = await createUser.execute({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    const response = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(response.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update User avatar, when non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorage = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorage,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update User avatar, when non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const fakeStorage = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorage,
    );

    const user = await createUser.execute({
      name: 'José da Silva',
      email: 'jose@gmail.com',
      password: '123456789',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    const response = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'secondAvatar.jpg',
    });

    expect(response.avatar).toBe('secondAvatar.jpg');
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  });
});