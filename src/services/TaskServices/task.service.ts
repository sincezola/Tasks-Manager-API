import { Injectable } from '@nestjs/common';
import { TasksRepository } from 'src/repositories/TasksRepository/TasksRepository';
import { created, internalServerError } from 'src/utils/httpResponses/httpResponseType';
import type { TasksServiceProtocol } from './TaskServiceProtocol';
import type { Task } from '../../entities/Task';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';
import type { ApiResponse } from 'src/types/ApiResponse';

@Injectable()
export class TasksService implements TasksServiceProtocol {

  constructor(private readonly tasksRepository: TasksRepository) {}

  async createTask(createTaskDTO: CreateTaskDto): Promise<ApiResponse<Task | Object>> {
    try {
      const createdTask = await this.tasksRepository.createTask(createTaskDTO);

      if (!createdTask) return internalServerError();

      return created(createdTask)

    } catch (taskCreateRepositoryError) {
      console.log(taskCreateRepositoryError)
    }
  }
}
