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

  async insertNewChoice(
    questionId: ObjectId,
    choiceId: ObjectId,
    session: ClientSession,
  ) {
    try {
      return await this.questionModel
        .findByIdAndUpdate(
          questionId,
          {
            $push: { choices: choiceId },
          },
          { session },
        )
        .exec();
    } catch (error) {
      console.log('ERROR_GETTING_QUESTION', error);
      throw new HttpException('ERROR_GETTING_QUESTION', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(questionId: ObjectId): Promise<Question> {
    try {
      return await this.questionModel.findById(questionId);
    } catch (error) {
      console.log('ERROR_FINDING_QUESTION', error);
      throw new HttpException('ERROR_FINDING_QUESTION', HttpStatus.BAD_REQUEST);
    }
  }
}
