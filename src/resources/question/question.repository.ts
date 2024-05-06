import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = new this.questionModel(createQuestionDto);
      return await newQuestion.save();
    } catch (error) {
      console.log('ERROR_CREATING_QUESTION', error);
      throw new HttpException(
        'ERROR_CREATING_QUESTION',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
