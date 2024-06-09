import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../../schemas/auth.schema';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GenerateLink } from '../../interfaces/auth.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>
  ) {}


  private async generateRandom(): Promise<string> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const candidate: string = uuidv4();
      const foundItem: AuthEntity | null = await this.authRepository.findOne({
        where: { short: candidate },
      });
      if (!foundItem) return candidate;
    }
  }
  @Transactional()
  async generateLink(input: GenerateLink): Promise<AuthEntity> {
    try {
      const short = await this.generateRandom();
      return this.authRepository.save({ url: input.url, short });
    } catch (error) {
      throw new HttpException(
        'failed to find auth account',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getLink(short: string): Promise<string> {
    try {
      const foundLink = await this.authRepository.findOne({ where: { short } });
      if (foundLink) {
        await this.authRepository.delete(foundLink.id);
      }
      return foundLink.url;
    } catch (error) {
      throw new HttpException(
        'failed to find link',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
