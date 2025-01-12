import type { Task } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class TasksServiceProtocol {
  abstract findTaskById(id: IdDTO): Promise<ApiResponse<Task | Object>>;
  abstract createTask(
    createTaskDTO: CreateTaskDto,
  ): Promise<ApiResponse<Task | Object>>;
  abstract deleteTask(id: IdDTO): Promise<ApiResponse<Task | Object>>;
}
