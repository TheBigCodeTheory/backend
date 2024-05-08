import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicsQuestionsHistoryService } from './topics-questions-history.service';
import { CreateTopicsQuestionsHistoryDto } from './dto/create-topics-questions-history.dto';
import { UpdateTopicsQuestionsHistoryDto } from './dto/update-topics-questions-history.dto';

@Controller('topics-questions-history')
export class TopicsQuestionsHistoryController {
  constructor(private readonly topicsQuestionsHistoryService: TopicsQuestionsHistoryService) {}

  @Post()
  create(@Body() createTopicsQuestionsHistoryDto: CreateTopicsQuestionsHistoryDto) {
    return this.topicsQuestionsHistoryService.create(createTopicsQuestionsHistoryDto);
  }

  @Get()
  findAll() {
    return this.topicsQuestionsHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsQuestionsHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicsQuestionsHistoryDto: UpdateTopicsQuestionsHistoryDto) {
    return this.topicsQuestionsHistoryService.update(+id, updateTopicsQuestionsHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsQuestionsHistoryService.remove(+id);
  }
}
