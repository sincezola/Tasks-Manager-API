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
        id: 1,
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '%)#&%^&%$!@(',
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should not create a new task with a random status', async () => {
    const response = await request(app.getHttpServer())
      .post('/management/create-task')
      .send({
        title: 'Lavar a casa',
        description: 'Tenho que lavar a casa amanhã',
        status: 'gireygkgerfhadu',
        userId: 1,
      });

    console.log('Response =', response.body);
    expect(response.status).toBe(400);

    expect(response.body.message).toContain(
      'O status deve ser "pendente", "concluida" ou "em progresso"',
    );
  });

  it('Should not create a new task without title', async () => {
    const response = await request(app.getHttpServer())
      .post('/management/create-task')
      .send({
        title: '',
        description: 'Tenho que lavar a casa amanhã',
        status: 'Pendente',
        userId: 1,
      });

    console.log('Response =', response.body);
    expect(response.status).toBe(400);

    expect(response.body.message).toContain('Title cannot be empty');
  });

  it('Should not create a new task with a id that does not have an user', async () => {
    const response = await request(app.getHttpServer())
      .post('/management/create-task')
      .send({
        title: 'Lavar a casa',
        description: 'Tenho que lavar a casa amanhã',
        status: 'Pendente',
        userId: 999999,
      });

    console.log('Response =', response.body);
    expect(response.status).toBe(404);

    expect(response.body.message).toContain('Cannot found user with id 999999');
  });

  it('Should create a new task successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/management/create-task')
      .send({
        title: 'Lavar a casa',
        description: 'Tenho que lavar a casa amanhã',
        status: 'Pendente',
        userId: 1,
      });

    console.log('Response =', response.body);
    expect(response.status).toBe(201);

    expect(response.body.taskProps.title).toBe('Lavar a casa');
    expect(response.body.taskProps.description).toBe(
      'Tenho que lavar a casa amanhã',
    );
    expect(response.body.taskProps.status).toBe('Pendente');
    expect(response.body.taskProps.userId).toBe(1);

    expect(response.body.taskProps.id).toBeDefined();
    expect(typeof response.body.taskProps.id).toBe('number');
    expect(response.body.taskProps.id).toBeGreaterThan(0);

    expect(response.body.taskProps.createdAt).toBeDefined();
    expect(new Date(response.body.taskProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );
  });

  it('Should create a new task without description', async () => {
    const response = await request(app.getHttpServer())
      .post('/management/create-task')
      .send({
        title: 'Lavar a casa',
        status: 'Pendente',
        userId: 1,
      });

    console.log('Response =', response.body);
    expect(response.status).toBe(201);

    expect(response.body.taskProps.title).toBe('Lavar a casa');
    expect(response.body.taskProps.description).toBeNull();
    expect(response.body.taskProps.status).toBe('Pendente');
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
