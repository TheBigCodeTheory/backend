import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceController } from './choice.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Choice, ChoiceSchema } from './entities/choice.entity';
import { ChoiceRepository } from './choice.repository';
import { QuestionService } from '../question/question.service';
import { QuestionModule } from '../question/question.module';
import { TopicModule } from '../topic/topic.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Choice.name, schema: ChoiceSchema }]),
    QuestionModule,
    TopicModule,
    DbModule,
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService, ChoiceRepository, MongooseModule, QuestionService],
  exports: [ChoiceService, ChoiceRepository, MongooseModule],
})
export class ChoiceModule {}
