import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject } from 'class-validator';

export class CreateChoiceDto {
  @ApiProperty({ required: true, type: String })
  @IsObject()
  description: {
    eng: string;
    spa: string;
  };
  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  correct: boolean;
}
