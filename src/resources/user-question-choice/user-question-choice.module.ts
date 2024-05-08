import { Module } from '@nestjs/common';
import { UserQuestionChoiceService } from './user-question-choice.service';
import { UserQuestionChoiceController } from './user-question-choice.controller';

@Module({
  controllers: [UserQuestionChoiceController],
  providers: [UserQuestionChoiceService],
})
export class UserQuestionChoiceModule {}
