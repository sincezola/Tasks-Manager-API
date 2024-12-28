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

    await prisma.user.createMany({
      data: [
        {
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          password: '%)#&%^&%$!@(',
        },
        {
          name: 'Mark Jhon',
          email: 'markjhon@example.com',
          password: '$(%*#*($#%',
        },
      ],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return all users in Database', async () => {
    const response = await request(app.getHttpServer()).get('/user/list-users');

    console.log('Response =', response.body);
    expect(response.status).toBe(200);

    // Primeiro elemento
    expect(response.body[0].userProps.name).toBe('Jhon Doe');
    expect(response.body[0].userProps.email).toBe('jhondoe@example.com');
    expect(response.body[0].userProps.password).toBe('%)#&%^&%$!@(');

    expect(response.body[0].userProps.id).toBeDefined();
    expect(typeof response.body[0].userProps.id).toBe('number');
    expect(response.body[0].userProps.id).toBe(1);
    expect(response.body[0].userProps.id).toBeGreaterThan(0);

    expect(response.body[0].userProps.createdAt).toBeDefined();
    expect(new Date(response.body[0].userProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );

    // Segundo elemento
    expect(response.body[1].userProps.name).toBe('Mark Jhon');
    expect(response.body[1].userProps.email).toBe('markjhon@example.com');
    expect(response.body[1].userProps.password).toBe('$(%*#*($#%');

    expect(response.body[1].userProps.id).toBeDefined();
    expect(typeof response.body[1].userProps.id).toBe('number');
    expect(response.body[1].userProps.id).toBe(2);
    expect(response.body[1].userProps.id).toBeGreaterThan(0);

    expect(response.body[1].userProps.createdAt).toBeDefined();
    expect(new Date(response.body[1].userProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );
  });
});
