import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { UsersService } from 'src/services/UserServices/user.service';
import type { UserControllerProtocol } from '../controllers-protocols/UserControllerProtocol';
import type { Response } from 'express';

// DTO's
import { IdDTO } from 'src/types/DTOS/IdDTO';
import { NameDTO } from 'src/types/DTOS/NameDTO';

@Controller('/user')
export class UsersController implements UserControllerProtocol {
  constructor(private userService: UsersService) {}

  @Get('/list-users')
  async getAllUsers(@Res() res: Response): Promise<Response> {
    const response = await this.userService.getAllUsers();

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }

  @Get('/by-id')
  async findUserById(
    @Query() id: IdDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.findUserById(id);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }

  @Get('/by-name')
  async findUserByName(
    @Query() name: NameDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.findUserByName(name);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }

  @Get('/:id/tasks')
  async getAllTasksOfUser(
    @Param() id: IdDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.getAllTasksOfUser(id);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }
}
