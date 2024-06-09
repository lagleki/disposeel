import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DbModule } from '../db/db.module';
import { AuthRepository } from '../db/repositories';

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [AuthRepository],
})
export class AppModule {}
