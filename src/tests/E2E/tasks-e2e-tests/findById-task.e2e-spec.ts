import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';

describe('Find-TaskById Tests (e2e)', () => {
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
        id: 1,
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '%)#&%^&%$!@(',
      },
    });

    await prisma.task.create({
      data: {
        title: 'Lavar a casa',
        description: 'Tenho que lavar a casa amanhã',
        status: 'Pendente',
        userId: 1,
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should not find a task with a NaN id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/management/task?id=Jhon',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(400);

    expect(response.body.message[0]).toBe('O valor deve ser maior que 0.');
  });

  it('Should not find a task with a not existent id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/management/task?id=99999',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(404);

    expect(response.body.message).toBe('Cannot find task with id: 99999');
  });

  it('Should find a task with an existing id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/management/task?id=1',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(200);

    expect(response.body.taskProps.title).toBe('Lavar a casa');
    expect(response.body.taskProps.description).toBe(
      'Tenho que lavar a casa amanhã',
    );
    expect(response.body.taskProps.status).toBe('Pendente');
    expect(response.body.taskProps.userId).toBe(1);

    expect(response.body.taskProps.id).toBeDefined();
    expect(typeof response.body.taskProps.id).toBe('number');
    expect(response.body.taskProps.id).toBe(1);
    expect(response.body.taskProps.id).toBeGreaterThan(0);

    expect(response.body.taskProps.createdAt).toBeDefined();
    expect(new Date(response.body.taskProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );
  });
});
