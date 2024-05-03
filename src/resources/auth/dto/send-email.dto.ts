import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GenerateCodeDto {
  @ApiProperty({ example: 'eze@gmail.com', required: true })
  @IsEmail()
  email: string;
}