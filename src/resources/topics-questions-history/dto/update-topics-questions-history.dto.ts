import { PartialType } from '@nestjs/swagger';
import { CreateTopicsQuestionsHistoryDto } from './create-topics-questions-history.dto';

export class UpdateTopicsQuestionsHistoryDto extends PartialType(CreateTopicsQuestionsHistoryDto) {}
