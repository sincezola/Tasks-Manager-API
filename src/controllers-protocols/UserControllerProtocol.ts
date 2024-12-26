import type { Response } from 'express';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class UserControllerProtocol {
  abstract findUserById(id: IdDTO, res: Response): Promise<Response>;
}
