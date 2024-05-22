import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQuestionChoice } from './entities/user-question-choice.entity';
import { CreateUserQuestionChoiceDto } from './dto/create-user-question-choice.dto';

export class UserQuestionChoiceRepository {
  constructor(
    @InjectModel(UserQuestionChoice.name)
    private userQuestionChoiceModel: Model<UserQuestionChoice>,
  ) {}

  async create(
    createUserQuestionChoiceDto: CreateUserQuestionChoiceDto,
  ): Promise<UserQuestionChoice> {
    try {
      const userQuestion = new this.userQuestionChoiceModel(
        createUserQuestionChoiceDto,
      );
      return await userQuestion.save();
    } catch (error) {
      console.log('ERROR_CREATING_USER_QUESTION', error);
      throw new HttpException(
        'ERROR_CREATING_USER_QUESTION',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
