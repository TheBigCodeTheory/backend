import { Injectable } from '@nestjs/common';
import { TopicsQuestionsHistoryRepository } from './topics-questions-history.repository';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';
import { TopicsQuestionsHistory } from './entities/topics-questions-history.entity';
import { UserService } from '../user/user.service';
import { MongoObjectId } from 'src/lib/common/types';

@Injectable()
export class TopicsQuestionsHistoryService {
  constructor(
    private readonly topicsQuestionsHistoryRepository: TopicsQuestionsHistoryRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: MongoObjectId,
    createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto,
  ): Promise<TopicsQuestionsHistory> {
    const userTopic = await this.topicsQuestionsHistoryRepository.create(
      createTopicsQuestionsHistoryDto,
    );
    await this.userService.addUserTopic(userId, userTopic._id);
    return userTopic;
  }
}
