import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './services/TaskServices/task.service';
import { TasksRepository } from './repositories/TasksRepository/TasksRepository';
import { PrismaModule } from './db/Prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository
  ],
})
export class AppModule {}
