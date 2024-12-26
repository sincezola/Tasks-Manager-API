import { User } from 'src/entities/User';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';
import type { UsersRepositoryProtocol } from './UsersRepositoryProtocol';

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
  constructor(private prisma: PrismaService) {}

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
}
