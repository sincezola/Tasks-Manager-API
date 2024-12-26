import type { User } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class UsersServiceProtocol {
  abstract findUserById(id: IdDTO): Promise<ApiResponse<User | Object>>;
}
