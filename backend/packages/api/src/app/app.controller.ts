import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';

import { HttpExceptionsFilter } from './exception.filter';
import { AuthRepository } from '../db/repositories';
import { AuthEntity } from '../schemas';
import { LinkGenerateDto } from '../dtos';

@UseFilters(HttpExceptionsFilter)
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthRepository
  ) {}

  @Get('health')
  async healthCheck() {
    return 'ok';
  }

  @Get('link/:id')
  async getLink(@Param('id') id: string): Promise<string> {
    return await this.authService.getLink(id);
  }

  @Post('link/generate')
  async generateLink(
    @Body() body: LinkGenerateDto
  ): Promise<{ status: 'ok'; user: AuthEntity }> {
    return { status: 'ok', user: await this.authService.generateLink(body) };
  }
}
