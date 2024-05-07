import { ApiProperty } from '@nestjs/swagger';

export class CreateChoiceDto {
  @ApiProperty({ required: true, type: String })
  description: {
    eng: string;
    spa: string;
  };
  @ApiProperty({ required: true, type: Boolean })
  correct: boolean;
}
