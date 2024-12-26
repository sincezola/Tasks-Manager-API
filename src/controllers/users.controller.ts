import { Controller, Get, Param, Res } from '@nestjs/common';
import type { UserControllerProtocol } from '../controllers-protocols/UserControllerProtocol';
import type { Response } from 'express';
import { UsersService } from 'src/services/UserServices/user.service';

// DTO's
import { IdDTO } from 'src/types/DTOS/IdDTO';

@Controller('/user')
export class UsersController implements UserControllerProtocol {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async findUserById(
    @Param() id: IdDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.findUserById(id);

    const { statusCode, body } = response;

    return res.status(statusCode).json(body);
  }
}
