import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Sofía', required: true })
  @IsString()
  firstname: string;
  @ApiProperty({ example: 'Vigna', required: false })
  @IsString()
  lastname: string;
  @ApiProperty({ example: 'sofia@example.com', required: true })
  @IsEmail()
  email: string;
}
