import { Injectable } from '@nestjs/common';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { ChoiceRepository } from './choice.repository';
import { QuestionService } from '../question/question.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class ChoiceService {
  constructor(
    private readonly choiceRepository: ChoiceRepository,
    private readonly questionService: QuestionService,
  ) {}
  async create(createChoiceDto: CreateChoiceDto, questionId: ObjectId) {
    const newChoice = await this.choiceRepository.create(
      createChoiceDto,
      questionId,
    );
    const id = newChoice._id;
    await this.questionService.insertNewChoice(questionId, id);
    return newChoice;
  }

  findAll() {
    return `This action returns all choice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} choice`;
  }

  update(id: number, updateChoiceDto: UpdateChoiceDto) {
    return `This action updates a #${id} choice`;
  }

  remove(id: number) {
    return `This action removes a #${id} choice`;
  }
}
