import { Module } from '@nestjs/common';
import { TopicsQuestionsHistoryService } from './topics-questions-history.service';
import { TopicsQuestionsHistoryController } from './topics-questions-history.controller';

@Module({
  controllers: [TopicsQuestionsHistoryController],
  providers: [TopicsQuestionsHistoryService],
})
export class TopicsQuestionsHistoryModule {}
