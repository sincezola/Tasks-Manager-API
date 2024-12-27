import type { User } from 'src/entities/User';

export abstract class UsersRepositoryProtocol {
  abstract findUserById(id: number): Promise<User | null>;
  abstract findUserByName(name: string): Promise<User | null>;
}
