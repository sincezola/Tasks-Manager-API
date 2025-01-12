import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';
import type { Response } from 'express';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class TaskControllerProtocol {
  abstract findTaskById(req: IdDTO, res: Response): Promise<Response>;
  abstract createTask(req: CreateTaskDto, res: Response): Promise<Response>;
  abstract deleteTask(req: IdDTO, res: Response): Promise<Response>;
}
