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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TopicsQuestionsHistory.name,
        schema: TopicsQuestionsHistorySchema,
      },
    ]),
    UserModule,
  ],
  controllers: [TopicsQuestionsHistoryController],
  providers: [
    TopicsQuestionsHistoryService,
    TopicsQuestionsHistoryRepository,
    UserService,
  ],
  exports: [
    TopicsQuestionsHistoryService,
    TopicsQuestionsHistoryRepository,
    MongooseModule,
  ],
})
export class TopicsQuestionsHistoryModule {}
