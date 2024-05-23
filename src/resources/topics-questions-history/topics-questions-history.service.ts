import { Injectable } from '@nestjs/common';
import { TopicsQuestionsHistoryRepository } from './topics-questions-history.repository';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';
import { TopicsQuestionsHistory } from './entities/topics-questions-history.entity';
import { UserService } from '../user/user.service';
import { MongoObjectId } from 'src/lib/common/types';
import { TopicService } from '../topic/topic.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class TopicsQuestionsHistoryService {
  constructor(
    private readonly topicsQuestionsHistoryRepository: TopicsQuestionsHistoryRepository,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
  ) {}

  async create(
    userId: MongoObjectId,
    createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto,
  ): Promise<TopicsQuestionsHistory> {
    const topic = await this.topicService.findById(
      createTopicsQuestionsHistoryDto.topic,
    );
    const userTopic = await this.topicsQuestionsHistoryRepository.create({
      topic: topic._id,
    });
    await this.userService.addUserTopic(userId, userTopic._id);
    return userTopic;
  }

  async findByTopic(userId: ObjectId, topicId: ObjectId): Promise<any> {
    const user = await this.userService.findById(userId);
    const userPopulated = await user.populate([
      {
        path: 'topicsQuestionsHistory',
        model: 'TopicsQuestionsHistory',
      },
    ]);

    return userPopulated.topicsQuestionsHistory.find(
      (history) => String(history.topic) === String(topicId),
    );
  }
}
