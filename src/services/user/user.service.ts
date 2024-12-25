import { IUserRepository } from '../../repositories/user/user.repository.interface';
import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { UserDto } from '../../dtos/user/user.dto';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  createUser = async (dto: CreateUserDto): Promise<UserDto> => {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user: UserDto | null = await this.userRepository.createUser(dto);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  };

  getUserById = async (id: number) => {
    const user: UserDto | null = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
}
