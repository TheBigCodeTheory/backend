import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { TopicService } from '../topic/topic.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly topicService: TopicService,
  ) {}
  // todo add transaction.
  async create(createQuestionDto: CreateQuestionDto, topicId: ObjectId) {
    const newQuestion = await this.questionRepository.create(
      createQuestionDto,
      topicId,
    );

    const id = newQuestion._id;
    await this.topicService.insertNewQuestion(topicId, id);
    return newQuestion;
  }
  async insertNewChoice(questionId: ObjectId, choiceId: ObjectId) {
    return await this.questionRepository.insertNewChoice(questionId, choiceId);
  }
  findAll() {
    const a = ' dato';
    {
      const a = ' dato2';
      {
        const a = ' dato3';
        a.concat('ssd');
      }
    }
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
