import prisma from '../../config/prisma';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { UserDto } from '../../dtos/user/user.dto';

export class UserRepository implements IUserRepository {
  async createUser(dto: CreateUserDto): Promise<UserDto | null> {
    return await prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async getUserById(id: number): Promise<UserDto | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
