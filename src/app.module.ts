import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './services/TaskServices/task.service';
import { PrismaService } from './db/Prisma/prisma.service';
import { TasksRepository } from './repositories/TasksRepository/TasksRepository';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TasksRepository],
})
export class AppModule {}
