import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/TaskServices/task.service';
import { TasksRepository } from './repositories/TasksRepository/TasksRepository';
import { PrismaModule } from './infra/db/Prisma/prisma.module';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/UsersRepository/UsersRepository';
import { UsersService } from './services/UserServices/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController, UsersController],
  providers: [TasksService, TasksRepository, UsersRepository, UsersService],
})
export class AppModule {}
