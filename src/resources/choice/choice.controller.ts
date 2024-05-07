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
import { ChoiceService } from './choice.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { ObjectId } from 'mongoose';
import { DbRepository } from '../db/db.repository';

@Controller('choice')
export class ChoiceController {
  constructor(
    private readonly choiceService: ChoiceService,
    private readonly dbRepository: DbRepository,
  ) {}

  @Version('1')
  @Post('/:questionId')
  async create(
    @Param('questionId') questionId: ObjectId,
    @Body() createChoiceDto: CreateChoiceDto,
  ) {
    const session = await this.dbRepository.getSessionWithTransaction();
    try {
      const response = await this.choiceService.create(
        createChoiceDto,
        questionId,
        session,
      );
      await session.commitTransaction();
      return response;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.choiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChoiceDto: UpdateChoiceDto) {
    return this.choiceService.update(+id, updateChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choiceService.remove(+id);
  }
}
