import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: 'DATABASE_URL',
      useFactory: () => {
        return process.env.NODE_ENV === 'test'
          ? 'file:./test.db'
          : 'file:./dev.db';
      },
    },
    {
      provide: PrismaService,
      useFactory: (databaseUrl: string) => new PrismaService(databaseUrl),
      inject: ['DATABASE_URL'],
    }
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
