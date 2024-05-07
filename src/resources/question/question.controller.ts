import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ObjectId } from 'mongoose';
import { DbRepository } from '../db/db.repository';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly dbRepository: DbRepository,
  ) {}
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('/:topicId')
  async create(
    @Param('topicId') topicId: ObjectId,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const session = await this.dbRepository.getSessionWithTransaction();
    try {
      const response = await this.questionService.create(
        createQuestionDto,
        topicId,
        session,
      );
      await session.commitTransaction();
      return response;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
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
