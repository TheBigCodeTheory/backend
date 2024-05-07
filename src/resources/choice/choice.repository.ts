import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { Choice } from './entities/choice.entity';

export class ChoiceRepository {
  constructor(@InjectModel(Choice.name) private choiceModel: Model<Choice>) {}

  async create(createChoiceDto: CreateChoiceDto, questionId: ObjectId) {
    try {
      const createdChoice = new this.choiceModel({
        ...createChoiceDto,
        question: questionId,
      });
      return await createdChoice.save();
    } catch (error) {
      console.log('ERROR_CREATING_CHOICE', error);
      throw new HttpException('ERROR_CREATING_CHOICE', HttpStatus.BAD_REQUEST);
    }
  }
}
