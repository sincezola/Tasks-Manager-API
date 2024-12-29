import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/UsersRepository/UsersRepository';
import { cannotFound, ok } from 'src/utils/httpResponses/httpResponseType';
import type { UsersServiceProtocol } from './UserServiceProtocol';
import type { Task, User } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { IdDTO } from 'src/types/DTOS/IdDTO';
import type { NameDTO } from 'src/types/DTOS/NameDTO';

@Injectable()
export class UsersService implements UsersServiceProtocol {
  constructor(private repository: UsersRepository) {}

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const users = await this.repository.getAllUsers();

    return ok(users);
  }

  async findUserById(id: IdDTO): Promise<ApiResponse<User | Object>> {
    const possibleUser = await this.repository.findUserById(id.id);

    if (!possibleUser) return cannotFound('Cannot find user with id: ' + id.id);

    return ok(possibleUser);
  }

  async findUserByName(name: NameDTO): Promise<ApiResponse<User | Object>> {
    const possibleUser = await this.repository.findUserByName(name.name);

    if (!possibleUser)
      return cannotFound('Cannot find user with name: ' + name.name);

    return ok(possibleUser);
  }

  async getAllTasksOfUser(id: IdDTO): Promise<ApiResponse<Task[] | Object>> {
    const tasks = await this.repository.getAllTasksOfUser(id.id);

    if (!tasks)
      return cannotFound({ message: `User with id ${id.id} don't exist.` });
    else if (tasks.length === 0)
      return ok({ message: "This user don't have registered tasks." });

    return ok(tasks);
  }
}
