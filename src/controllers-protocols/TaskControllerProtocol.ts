import type { CreateTaskDto } from "src/types/DTOS/Create-TaskDTO";
import type { Response } from "express"

export abstract class TaskControllerProtocol {
  abstract createTask(req: CreateTaskDto, res: Response): Promise<Response>
}