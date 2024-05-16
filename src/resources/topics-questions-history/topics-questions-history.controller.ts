import { Controller } from '@nestjs/common';
import { TopicsQuestionsHistoryService } from './topics-questions-history.service';

@Controller('user-topics')
export class TopicsQuestionsHistoryController {
  constructor(
    private readonly topicsQuestionsHistoryService: TopicsQuestionsHistoryService,
  ) {}
}
