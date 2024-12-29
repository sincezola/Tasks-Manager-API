import type { Task, User } from '@prisma/client';
import type { ApiResponse } from 'src/types/ApiResponse';
import type { IdDTO } from 'src/types/DTOS/IdDTO';
import type { NameDTO } from 'src/types/DTOS/NameDTO';

export abstract class UsersServiceProtocol {
  abstract getAllUsers(): Promise<ApiResponse<User[]>>;
  abstract findUserById(id: IdDTO): Promise<ApiResponse<User | Object>>;
  abstract findUserByName(name: NameDTO): Promise<ApiResponse<User | Object>>;
  abstract getAllTasksOfUser(id: IdDTO): Promise<ApiResponse<Task[] | Object>>
}
