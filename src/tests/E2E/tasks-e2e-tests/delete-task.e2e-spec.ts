import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';
import request from 'supertest';

describe('Create-Task Tests (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(new PrismaService())
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    const prisma = app.get(PrismaService);

    await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '%)#&%^&%$!@(',
      },
    });

    await prisma.task.create({
      data: {
        title: 'Lavar a Louça',
        description: 'Lavando a Louça',
        status: 'Em Progresso',
        userId: 1,
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return an error for tasks that do not exist', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/management/delete-task/2',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(404);
  });

  it('Should delete de ID 1 task', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/management/delete-task/1',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(200);

    expect(response.body.taskProps.title).toBe('Lavar a Louça');
    expect(response.body.taskProps.description).toBe('Lavando a Louça');
    expect(response.body.taskProps.status).toBe('Em Progresso');
    expect(response.body.taskProps.userId).toBe(1);

    expect(response.body.taskProps.id).toBeDefined();
    expect(typeof response.body.taskProps.id).toBe('number');
    expect(response.body.taskProps.id).toBeGreaterThan(0);

    expect(response.body.taskProps.createdAt).toBeDefined();
    expect(new Date(response.body.taskProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );
  });
});
