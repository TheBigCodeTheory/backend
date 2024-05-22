import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsQuestionsHistoryController } from './topics-questions-history.controller';
import { TopicsQuestionsHistoryRepository } from './topics-questions-history.repository';
import { TopicsQuestionsHistoryService } from './topics-questions-history.service';
import {
  TopicsQuestionsHistory,
  TopicsQuestionsHistorySchema,
} from './entities/topics-questions-history.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TopicModule } from '../topic/topic.module';
import { TopicService } from '../topic/topic.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TopicsQuestionsHistory.name,
        schema: TopicsQuestionsHistorySchema,
      },
    ]),
    UserModule,
    TopicModule,
  ],
  controllers: [TopicsQuestionsHistoryController],
  providers: [
    TopicsQuestionsHistoryService,
    TopicsQuestionsHistoryRepository,
    UserService,
    TopicService,
  ],
  exports: [
    TopicsQuestionsHistoryService,
    TopicsQuestionsHistoryRepository,
    MongooseModule,
  ],
})
export class TopicsQuestionsHistoryModule {}
