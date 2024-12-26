import type { User } from 'src/entities/User';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class UsersRepositoryProtocol {
  abstract findUserById(id: number): Promise<User | null>;
}
