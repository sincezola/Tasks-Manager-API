import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/UsersRepository/UsersRepository';
import { cannotFound, ok } from 'src/utils/httpResponses/httpResponseType';
import type { UsersServiceProtocol } from './UserServiceProtocol';
import type { User } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

@Injectable()
export class UsersService implements UsersServiceProtocol {
  constructor(private repository: UsersRepository) {}

  async findUserById(id: IdDTO): Promise<ApiResponse<User | Object>> {
    const possibleUser = await this.repository.findUserById(id.id);

    if (!possibleUser) return cannotFound('Cannot find user with id ' + id.id);

    return ok(possibleUser);
  }
}
