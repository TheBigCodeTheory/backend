import { Injectable } from '@nestjs/common';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';
import { UpdateTopicsQuestionsHistoryDto } from './dto/update-topics-questions-history.dto';

@Injectable()
export class TopicsQuestionsHistoryService {
  create(createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto) {
    return 'This action adds a new topicsQuestionsHistory';
  }

  findAll() {
    return `This action returns all topicsQuestionsHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicsQuestionsHistory`;
  }

  update(id: number, updateTopicsQuestionsHistoryDto: UpdateTopicsQuestionsHistoryDto) {
    return `This action updates a #${id} topicsQuestionsHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicsQuestionsHistory`;
  }
}
