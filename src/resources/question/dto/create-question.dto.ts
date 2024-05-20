import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    type: Object,
    example: `eng: basic list, spa: lista basica`,
    required: true,
  })
  @IsObject()
  name: {
    eng: string;
    spa: string;
  };

  @ApiProperty({
    type: Object,
    example: `{eng: What html tag is used for the ordered list , spa: Que etiqueta de html se utiliza para la lista ordenada }`,
    required: true,
  })
  @IsObject({})
  questionDescription: {
    eng: string;
    spa: string;
  };

  @ApiProperty({
    type: String,
    example: 'text',
    required: true,
  })
  @IsString({})
  type: string;
}
