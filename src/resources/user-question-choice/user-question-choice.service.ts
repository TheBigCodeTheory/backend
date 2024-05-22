import { Injectable } from '@nestjs/common';
import { UserQuestionChoiceRepository } from './user-question-choice.repository';
import { CreateUserQuestionChoiceDto } from './dto/create-user-question-choice.dto';
import { UserQuestionChoice } from './entities/user-question-choice.entity';

@Injectable()
export class UserQuestionChoiceService {
  constructor(
    private readonly userQuestionChoiceRepository: UserQuestionChoiceRepository,
  ) {}

  async create(
    createUserQuestionChoiceDto: CreateUserQuestionChoiceDto,
  ): Promise<UserQuestionChoice> {
    const userQuestion = await this.userQuestionChoiceRepository.create(
      createUserQuestionChoiceDto,
    );
    return userQuestion;
  }
}
