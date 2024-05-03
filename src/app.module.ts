import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './resources/db/db.module';
import { ChoiceModule } from './resources/choice/choice.module';
import { QuestionModule } from './resources/question/question.module';
import { TopicModule } from './resources/topic/topic.module';
import { TopicsQuestionsHistoryModule } from './resources/topics-questions-history/topics-questions-history.module';
import { UserQuestionChoiceModule } from './resources/user-question-choice/user-question-choice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    DbModule,
    ChoiceModule,
    QuestionModule,
    TopicModule,
    UserQuestionChoiceModule,
    TopicsQuestionsHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
