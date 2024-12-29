import { User } from 'src/entities/User';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';
import type { UsersRepositoryProtocol } from './UsersRepositoryProtocol';
import { Task } from 'src/entities/Task';

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

  async getAllTasksOfUser(id: number): Promise<Task[] | null> {
    try {
      const tasksDb = await this.prisma.user.findUnique({
        where: { id },
        include: { tasks: true },
      });

      if (!tasksDb) return null;

      const tasks = tasksDb.tasks.map((tasks) => {
        return new Task(tasks);
      });

      return tasks;
    } catch (getTasksError) {
      console.log(getTasksError);
    }
  }
}
