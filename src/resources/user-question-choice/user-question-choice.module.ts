import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQuestionChoiceController } from './user-question-choice.controller';
import { UserQuestionChoiceRepository } from './user-question-choice.repository';
import { UserQuestionChoiceService } from './user-question-choice.service';
import {
  UserQuestionChoice,
  UserQuestionChoiceSchema,
} from './entities/user-question-choice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserQuestionChoice.name,
        schema: UserQuestionChoiceSchema,
      },
    ]),
  ],
  controllers: [UserQuestionChoiceController],
  providers: [UserQuestionChoiceService, UserQuestionChoiceRepository],
  exports: [
    UserQuestionChoiceService,
    UserQuestionChoiceRepository,
    MongooseModule,
  ],
})
export class UserQuestionChoiceModule {}
