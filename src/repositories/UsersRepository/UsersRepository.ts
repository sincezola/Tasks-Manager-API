import { User } from 'src/entities/User';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';
import type { UsersRepositoryProtocol } from './UsersRepositoryProtocol';

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();

      return users.map((user) => {
        return new User(user);
      });
    } catch (getUsersError) {
      console.log(getUsersError);
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      const possibleUser = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!possibleUser) {
        return null;
      }

      return new User(possibleUser);
    } catch (findUserError) {
      console.log(findUserError);
    }
  }

  async findUserByName(name: string): Promise<User | null> {
    try {
      const possibleUser = await this.prisma.user.findFirst({
        where: {
          name,
        },
      });

      if (!possibleUser) {
        return null;
      }

      return new User(possibleUser);
    } catch (findUserError) {
      console.log(findUserError);
    }
  }
}
