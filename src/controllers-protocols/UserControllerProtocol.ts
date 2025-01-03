import type { Response } from 'express';
import type { IdDTO } from 'src/types/DTOS/IdDTO';
import type { NameDTO } from 'src/types/DTOS/NameDTO';

export abstract class UserControllerProtocol {
  abstract getAllUsers(res: Response): Promise<Response>;
  abstract findUserById(id: IdDTO, res: Response): Promise<Response>;
  abstract findUserByName(name: NameDTO, res: Response): Promise<Response>;
  abstract getAllTasksOfUser(id: IdDTO, res: Response): Promise<Response>;
}
