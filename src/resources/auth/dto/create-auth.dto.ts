import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'eze@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Eze', required: true })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Villa', required: false })
  @IsString()
  lastname: string;
}
