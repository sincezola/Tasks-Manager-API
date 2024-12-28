import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/db/Prisma/prisma.service';

describe('FindUserById Tests (e2e)', () => {
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
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should not find a user with a NaN id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/user/by-id?id=Jhon',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(400);

    expect(response.body.message[0]).toBe('O valor deve ser maior que 0.');
  });

  it('Should not find a user with a not existent id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/user/by-id?id=99999',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(404);

    expect(response.body.message).toBe('Cannot find user with id: 99999');
  });

  it('Should find a user with an existing id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/user/by-id?id=1',
    );

    console.log('Response =', response.body);
    expect(response.status).toBe(200);

    expect(response.body.userProps.name).toBe('Jhon Doe');
    expect(response.body.userProps.email).toBe('jhondoe@example.com');
    expect(response.body.userProps.password).toBe('%)#&%^&%$!@(');

    expect(response.body.userProps.id).toBeDefined();
    expect(typeof response.body.userProps.id).toBe('number');
    expect(response.body.userProps.id).toBe(1);
    expect(response.body.userProps.id).toBeGreaterThan(0);

    expect(response.body.userProps.createdAt).toBeDefined();
    expect(new Date(response.body.userProps.createdAt).toString()).not.toBe(
      'Invalid Date',
    );
  });
});
