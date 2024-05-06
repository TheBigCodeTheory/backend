import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    example: 'Test Topic',
    description: 'Topic name',
    required: true,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'icon_name_in_front',
    description: 'Topic icon',
    required: true,
  })
  @IsString()
  icon: string;
  @ApiProperty({
    example: '#000000',
    description: 'Topic color',
    required: true,
  })
  @IsString()
  color: string;

  @ApiProperty({ example: 1, description: 'Topic level', required: true })
  @IsNumber()
  level: number;
}
