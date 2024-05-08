import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ObjectId } from 'mongoose';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Version('1')
  @Post('/:topicId')
  create(
    @Param('topicId') topicId: ObjectId,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.create(createQuestionDto, topicId);
  }
  @Version('1')
  @Get()
  findAll() {
    return this.questionService.findAll();
  }
  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }
  @Version('1')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
