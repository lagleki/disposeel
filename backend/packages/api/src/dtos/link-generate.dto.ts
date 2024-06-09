import { IsUrl } from 'class-validator';

export class LinkGenerateDto {
  @IsUrl()
  url: string;
}
