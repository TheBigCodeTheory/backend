import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { TopicsQuestionsHistory } from './entities/topics-questions-history.entity';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';

export class TopicsQuestionsHistoryRepository {
  constructor(
    @InjectModel(TopicsQuestionsHistory.name)
    private topicsQuestionsHistoryModel: Model<TopicsQuestionsHistory>,
  ) {}

  async create(
    createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto,
    session?: ClientSession,
  ): Promise<TopicsQuestionsHistory> {
    try {
      const userTopics = new this.topicsQuestionsHistoryModel(
        createTopicsQuestionsHistoryDto,
        { session },
      );
      return await userTopics.save();
    } catch (error) {
      console.log('ERROR_CREATING_USER_TOPIC', error);
      throw new HttpException(
        'ERROR_CREATING_USER_TOPIC',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
