import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

// DTO's
import { CreateTaskDto } from './types/DTOS/Create-TaskDTO';
import { ApiResponse } from './types/ApiResponse';

@Controller('/management')
export class AppController {
  constructor(private appService: AppService) {}

  @Post("/create-task")
  createTask(@Body() reqBody: CreateTaskDto): ApiResponse<CreateTaskDto> {
    const { title, status, description, userId} = reqBody;

    const responseObj = {
      title,
      status,
      description,
      userId,
    }

    return {
      data: responseObj,
    }
  }
}
