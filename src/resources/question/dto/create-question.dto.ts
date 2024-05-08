import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateQuestionDto {
  @ApiProperty({
    type: Object,
    example: `eng: basic list, spa: lista basica`,
  })
  @IsObject()
  name: {
    eng: string;
    spa: string;
  };

  @ApiProperty({
    type: Object,
    example: `eng: What html tag is used for the ordered list , spa: Que etiqueta de html se utiliza para la lista ordenada `,
  })
  @IsObject({})
  questionDescription: {
    eng: string;
    spa: string;
  };

  @ApiProperty({
    type: String,
    example: 'text',
  })
  type: string;
}
