import { Injectable } from '@nestjs/common';
import { TopicsQuestionsHistoryRepository } from './topics-questions-history.repository';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';
import { TopicsQuestionsHistory } from './entities/topics-questions-history.entity';
import { UserService } from '../user/user.service';
import { MongoObjectId } from 'src/lib/common/types';
import { ClientSession } from 'mongoose';

@Injectable()
export class TopicsQuestionsHistoryService {
  constructor(
    private readonly topicsQuestionsHistoryRepository: TopicsQuestionsHistoryRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: MongoObjectId,
    createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto,
    session: ClientSession,
  ): Promise<TopicsQuestionsHistory> {
    const userTopic = await this.topicsQuestionsHistoryRepository.create(
      createTopicsQuestionsHistoryDto,
      session,
    );
    await this.userService.addUserTopic(userId, userTopic._id, session);
    return userTopic;
  }
}
