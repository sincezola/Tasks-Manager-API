import { Task } from 'src/entities/Task';
import type { CreateTaskDto } from 'src/types/DTOS/Create-TaskDTO';
import type { TasksRepositoryProtocol } from './TasksRepositoryProtocol';
import { PrismaService } from 'src/db/Prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository implements TasksRepositoryProtocol {
  constructor(private prisma: PrismaService) {}

  async createTask(taskProps: CreateTaskDto): Promise<Task> {
    try {
      const { title, status: _status, description, userId } = taskProps;

      const status = _status
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '); // Faz a primeira letra de cada palavra ficar maiúscula

      const data: any = {
        title,
        status,
        userId,
      };
      
      if (description && description !== "") {
        data.description = description; // Adiciona description apenas se existir
      }

      const createdTask = await this.prisma.task.create({ data });

      return new Task(createdTask);
    } catch (createTaskError) {
      console.log(createTaskError);
    }
  }
}
