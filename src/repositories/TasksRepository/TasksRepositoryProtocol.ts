import type { Task } from 'src/entities/Task';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';

export abstract class TasksRepositoryProtocol {
  abstract findTaskById(id: number): Promise<Task | null>;
  abstract createTask(taskProps: CreateTaskDto): Promise<Task>;
  abstract deleteTask(id: number): Promise<Task>
}
