import { IUserRepository } from '../../repositories/user/user.repository.interface';
import { UserService } from './user.service';
import { CreateUserDto } from '../../dtos/user/createUser.dto';

jest.mock('../../repositories/user/user.repository');

describe('User Service', () => {
  let userService: UserService;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = <IUserRepository>{
      createUser: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
    };
    userService = new UserService(repository);
  });

  describe('createUser', () => {
    it('should create a new user if the email is not already in use', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };

      const spyGetUser = jest.spyOn(repository, 'getUserByEmail');
      spyGetUser.mockResolvedValue(null);

      const spyCreateUser = jest.spyOn(repository, 'createUser');
      spyCreateUser.mockResolvedValue(mockUser);

      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };
      const result = await userService.createUser(dto);

      // Verifica se o repositório foi chamado com os argumentos corretos
      expect(spyGetUser).toHaveBeenCalledWith('test@example.com');
      expect(spyCreateUser).toHaveBeenCalledWith(
        'test@example.com',
        'Test User',
      );
      expect(result).toEqual(mockUser);
    });
  });

  it('should throw an error if the email is already in use', async () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };

    const spyGetUser = jest.spyOn(repository, 'getUserByEmail');
    spyGetUser.mockResolvedValue(mockUser);

    await expect(
      userService.createUser({ email: 'test@example.com', name: 'Test User' }),
    ).rejects.toThrow('Email already in use');

    expect(spyGetUser).toHaveBeenCalledWith('test@example.com');
    expect(repository.createUser).not.toHaveBeenCalled();
  });

  describe('getUserById', () => {
    it('should return a user if the ID exists', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };

      const spyGetUserById = jest.spyOn(repository, 'getUserById');
      spyGetUserById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(spyGetUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user is not found', async () => {
      const spyGetUserById = jest.spyOn(repository, 'getUserById');
      spyGetUserById.mockResolvedValue(null);

      await expect(userService.getUserById(0)).rejects.toThrow(
        'User not found',
      );

      expect(spyGetUserById).toHaveBeenCalledWith(0);
    });
  });
});
