import type { Task } from "src/entities/Task";
import type { CreateTaskDto } from "src/types/DTOS/Create-TaskDTO";

export abstract class TasksRepositoryProtocol {
  abstract createTask(taskProps: CreateTaskDto): Promise<Task>
}