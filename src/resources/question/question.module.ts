import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.entity';
import { QuestionRepository } from './question.repository';
import { TopicService } from '../topic/topic.service';
import { TopicModule } from '../topic/topic.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    TopicModule,
    DbModule,
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    QuestionRepository,
    MongooseModule,
    TopicService,
  ],
  exports: [QuestionService, QuestionRepository, MongooseModule],
})
export class QuestionModule {}
