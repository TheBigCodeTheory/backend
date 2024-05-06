import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicRepository } from './topic.repository';
import { ObjectId } from 'mongoose';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async create(createTopicDto: CreateTopicDto) {
    return await this.topicRepository.create(createTopicDto);
  }

  async findAll() {
    return this.topicRepository.getAll();
  }
  async findById(id: ObjectId) {
    return await this.topicRepository.findById(id);
  }

  async insertNewQuestion(topic: ObjectId, question: ObjectId) {
    return await this.topicRepository.insertNewQuestion(topic, question);
  }
  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
