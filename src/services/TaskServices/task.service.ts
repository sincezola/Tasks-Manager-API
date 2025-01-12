import { Injectable } from '@nestjs/common';
import { TasksRepository } from 'src/repositories/TasksRepository/TasksRepository';
import {
  cannotFound,
  created,
  internalServerError,
  ok,
} from 'src/utils/httpResponses/httpResponseType';
import { UsersRepository } from 'src/repositories/UsersRepository/UsersRepository';
import type { TasksServiceProtocol } from './TaskServiceProtocol';
import type { Task } from '../../entities/Task';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

@Injectable()
export class TasksService implements TasksServiceProtocol {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createTask(
    createTaskDTO: CreateTaskDto,
  ): Promise<ApiResponse<Task | Object>> {
    try {
      const { userId } = createTaskDTO;

      const userExists = await this.usersRepository.findUserById(userId);

      if (!userExists)
        return cannotFound('Cannot find user with id: ' + userId);

      const createdTask = await this.tasksRepository.createTask(createTaskDTO);

      if (!createdTask) return internalServerError();

      return created(createdTask);
    } catch (taskCreateRepositoryError) {
      console.log(taskCreateRepositoryError);
    }
  }

  async findTaskById(id: IdDTO): Promise<ApiResponse<Task | Object>> {
    try {
      const possibleTask = await this.tasksRepository.findTaskById(id.id);

      if (!possibleTask)
        return cannotFound('Cannot find task with id: ' + id.id);

      return ok(possibleTask);
    } catch (taskFindRepositoryError) {
      console.log(taskFindRepositoryError);
    }
  }

  async deleteTask(id: IdDTO): Promise<ApiResponse<Task | Object>> {
    try {
      const thisTaskExists = await this.findTaskById(id);

      if (
        thisTaskExists.statusCode !== 200 &&
        thisTaskExists.statusCode === 404
      )
        return cannotFound(thisTaskExists.body);

      if (
        thisTaskExists.statusCode !== 200 &&
        thisTaskExists.statusCode === 500
      )
        return internalServerError();

      const deletedTask = await this.tasksRepository.deleteTask(id.id);

      return ok(deletedTask);
    } catch (taskDeleteRepositoryError) {
      console.log(taskDeleteRepositoryError);
    }
  }
}
