import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { TasksService } from '../services/TaskServices/task.service';
import type { TaskControllerProtocol } from '../controllers-protocols/TaskControllerProtocol';
import type { Response } from 'express';

// DTO's
import { CreateTaskDto } from '../types/DTOS/Create-TaskDTO';
import { IdDTO } from 'src/types/DTOS/IdDTO';

@Controller('/management')
export class TasksController implements TaskControllerProtocol {
  constructor(private tasksService: TasksService) {}

  @Get('/task')
  async findTaskById(
    @Query() id: IdDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.tasksService.findTaskById(id);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }

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

    const response = await this.tasksService.createTask(props);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }
}
