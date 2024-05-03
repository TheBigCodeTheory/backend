import { PartialType } from '@nestjs/swagger';
import { CreateUserQuestionChoiceDto } from './create-user-question-choice.dto';

export class UpdateUserQuestionChoiceDto extends PartialType(CreateUserQuestionChoiceDto) {}
