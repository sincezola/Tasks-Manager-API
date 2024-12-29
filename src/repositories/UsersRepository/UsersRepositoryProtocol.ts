import type { Task } from 'clients/dev';
import type { User } from 'src/entities/User';
import type { IdDTO } from 'src/types/DTOS/IdDTO';

export abstract class UsersRepositoryProtocol {
  abstract getAllUsers(): Promise<User[]>;
  abstract findUserById(id: number): Promise<User | null>;
  abstract findUserByName(name: string): Promise<User | null>;
  abstract getAllTasksOfUser(id: number): Promise<Task[] | null>;
}
