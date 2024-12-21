import { Body, Controller, Post, Res } from '@nestjs/common';
import { TasksService } from './services/TaskServices/task.service';
import type { Response } from 'express';

// DTO's
import { CreateTaskDto } from './types/DTOS/Create-TaskDTO';
import { ApiResponse } from './types/ApiResponse';
import type { TaskControllerProtocol } from './ControllersProtocols/TaskControllerProtocol';

@Controller('/management')
export class TasksController implements TaskControllerProtocol {
  constructor(private tasksService: TasksService) {}

  @Post('/create-task')
  async createTask(
    @Body() reqBody: CreateTaskDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { title, status, description, userId } = reqBody;

    const props: CreateTaskDto = {
      title,
      status,
      userId,
    };

    if (description && description !== '') {
      props.description = description;
    }

    const taskTryingToBeCreated = await this.tasksService.createTask(props);

    const { statusCode, body } = taskTryingToBeCreated;

    return res.status(statusCode).json(body);
  }
}
