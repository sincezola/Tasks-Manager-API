import type { Task } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';

export abstract class TasksServiceProtocol {
  abstract createTask(
    createTaskDTO: CreateTaskDto,
  ): Promise<ApiResponse<Task | Object>>;
}
