import { Injectable } from '@nestjs/common';
import { CreateUserQuestionChoiceDto } from './dto/create-user-question-choice.dto';
import { UpdateUserQuestionChoiceDto } from './dto/update-user-question-choice.dto';

@Injectable()
export class UserQuestionChoiceService {
  create(createUserQuestionChoiceDto: CreateUserQuestionChoiceDto) {
    return 'This action adds a new userQuestionChoice';
  }

  findAll() {
    return `This action returns all userQuestionChoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userQuestionChoice`;
  }

  update(id: number, updateUserQuestionChoiceDto: UpdateUserQuestionChoiceDto) {
    return `This action updates a #${id} userQuestionChoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} userQuestionChoice`;
  }
}
