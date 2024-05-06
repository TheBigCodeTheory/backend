import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly topicService: TopicService,
  ) {}
  // todo add transaction.
  async create(createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.questionRepository.create(createQuestionDto);
    const topicId = createQuestionDto.topicId;
    const id = newQuestion._id;
    await this.topicService.insertNewQuestion(topicId, id);
    return newQuestion;
  }

  findAll() {
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
