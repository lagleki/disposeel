import { Module } from '@nestjs/common';

import { AuthRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AuthEntity } from '../schemas/auth.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [AuthEntity],
          synchronize: true,
          logging: false,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    TypeOrmModule.forFeature([AuthEntity]),
  ],
  providers: [AuthRepository],
  exports: [TypeOrmModule],
})
export class DbModule {}
