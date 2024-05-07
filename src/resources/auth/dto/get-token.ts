import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class GetTokenDto {
  @ApiProperty({ example: 'eze@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11111', required: true })
  @IsString()
  code: string;
}
