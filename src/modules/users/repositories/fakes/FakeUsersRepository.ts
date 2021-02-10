import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let providers = this.users;

    if (except_user_id) {
      providers = this.users.filter(user => user.id !== except_user_id);
    }
    return providers;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);
    return user;
  }

  public async save(user: User): Promise<User> {
    const saveUser = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[saveUser] = user;
    return user;
  }
}

export default FakeUsersRepository;
