import { InjectModel } from '@nestjs/mongoose';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

export class TopicRepository {
  constructor(@InjectModel(Topic.name) private topicModel: Model<Topic>) {}

  async create(createTopicDto: CreateTopicDto) {
    try {
      const newTopic = new this.topicModel(createTopicDto);
      return await newTopic.save();
    } catch (error) {
      console.log('ERROR_CREATING_TOPIC', error);
      throw new HttpException('ERROR_CREATING_TOPIC', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    try {
      return await this.topicModel
        .find({})
        .lean()
        .populate({ path: 'questions', model: 'Question' })
        .exec();
    } catch (error) {
      console.log('ERROR_GETTING_TOPICS', error);
      throw new HttpException('ERROR_GETTING_TOPICS', HttpStatus.BAD_REQUEST);
    }
  }
  async findById(id: ObjectId) {
    try {
      return await this.topicModel.findById(id);
    } catch (error) {
      console.log('ERROR_GETTING_TOPIC', error);
      throw new HttpException('ERROR_GETTING_TOPIC', HttpStatus.BAD_REQUEST);
    }
  }

  async insertNewQuestion(topicId: ObjectId, questionId: ObjectId) {
    try {
      return await this.topicModel
        .findByIdAndUpdate(topicId, {
          $push: { questions: questionId },
        })
        .exec();
    } catch (error) {
      console.log('ERROR_GETTING_TOPIC', error);
      throw new HttpException('ERROR_GETTING_TOPIC', HttpStatus.BAD_REQUEST);
    }
  }
}
