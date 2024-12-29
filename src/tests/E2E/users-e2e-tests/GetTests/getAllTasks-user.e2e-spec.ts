import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';

describe('GetAllUsers Tests (e2e)', () => {
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

    await prisma.task.createMany({
      data: [
        {
          title: 'Lavar a Louça',
          description: 'Lavando a Louça',
          status: 'Em Progresso',
          userId: 1,
        },
        {
          title: 'Limpar o Chão',
          description: 'Tenho que limpar o chão amanhã',
          status: 'Pendente',
          userId: 1,
        },
      ],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return all tasks of user Jhon Doe', async () => {
    const response = await request(app.getHttpServer()).get('/user/1/tasks');

    console.log('Response =', response.body);
    expect(response.status).toStrictEqual(200);

    // Primeiro elemento
    expect(response.body[0].taskProps.title).toStrictEqual('Lavar a Louça');
    expect(response.body[0].taskProps.description).toStrictEqual(
      'Lavando a Louça',
    );
    expect(response.body[0].taskProps.status).toStrictEqual('Em Progresso');
    expect(response.body[0].taskProps.userId).toStrictEqual(1);

    expect(response.body[0].taskProps.id).toBeDefined();
    expect(typeof response.body[0].taskProps.id).toStrictEqual('number');
    expect(response.body[0].taskProps.id).toStrictEqual(1);
    expect(response.body[0].taskProps.id).toBeGreaterThan(0);

    expect(response.body[0].taskProps.createdAt).toBeDefined();
    expect(
      new Date(response.body[0].taskProps.createdAt).toString(),
    ).not.toStrictEqual('Invalid Date');

    // Segundo elemento
    expect(response.body[1].taskProps.title).toStrictEqual('Limpar o Chão');
    expect(response.body[1].taskProps.description).toStrictEqual(
      'Tenho que limpar o chão amanhã',
    );
    expect(response.body[1].taskProps.status).toStrictEqual('Pendente');
    expect(response.body[0].taskProps.userId).toStrictEqual(1);

    expect(response.body[1].taskProps.id).toBeDefined();
    expect(typeof response.body[1].taskProps.id).toStrictEqual('number');
    expect(response.body[1].taskProps.id).toStrictEqual(2);
    expect(response.body[1].taskProps.id).toBeGreaterThan(0);

    expect(response.body[1].taskProps.createdAt).toBeDefined();
    expect(
      new Date(response.body[1].taskProps.createdAt).toString(),
    ).not.toStrictEqual('Invalid Date');
  });

  it('Should return 404 to user id that does not exists', async () => {
    const response = await request(app.getHttpServer()).get('/user/9999/tasks');

    console.log('Response =', response.body);
    expect(response.status).toStrictEqual(404);

    expect(response.body.message).toStrictEqual({
      message: "User with id 9999 don't exist.",
    });
  });

  it('Should return 400 to an invalid id', async () => {
    const response = await request(app.getHttpServer()).get('/user/0/tasks');

    console.log('Response =', response.body);
    expect(response.status).toStrictEqual(400);

    expect(response.body.message).toStrictEqual([
      'O valor deve ser maior que 0.',
    ]);
  });

  it('Should return 400 to an invalid id', async () => {
    const response = await request(app.getHttpServer()).get('/user/f/tasks');

    console.log('Response =', response.body);
    expect(response.status).toStrictEqual(400);

    expect(response.body.message).toStrictEqual([
      'O valor deve ser maior que 0.',
      'O valor deve ser um número.',
    ]);
  });
});
