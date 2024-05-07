import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity';
import { ClientSession, Model, ObjectId } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    topicId: ObjectId,
    session: ClientSession,
  ) {
    try {
      const newQuestion = new this.questionModel({
        ...createQuestionDto,
        topic: topicId,
      });
      return await newQuestion.save({ session });
    } catch (error) {
      console.log('ERROR_CREATING_QUESTION', error);
      throw new HttpException(
        'ERROR_CREATING_QUESTION',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insertNewChoice(questionId: ObjectId, choiceId: ObjectId) {
    try {
      return await this.questionModel
        .findByIdAndUpdate(questionId, {
          $push: { choices: choiceId },
        })
        .exec();
    } catch (error) {
      console.log('ERROR_GETTING_QUESTION', error);
      throw new HttpException('ERROR_GETTING_QUESTION', HttpStatus.BAD_REQUEST);
    }
  }
}
