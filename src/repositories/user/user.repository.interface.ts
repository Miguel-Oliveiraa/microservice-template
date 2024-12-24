import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { UserDto } from '../../dtos/user/user.dto';

export interface IUserRepository {
  createUser(dto: CreateUserDto): Promise<UserDto | null>;
  getUserById(id: number): Promise<UserDto | null>;
  getUserByEmail(email: string): Promise<UserDto | null>;
}
