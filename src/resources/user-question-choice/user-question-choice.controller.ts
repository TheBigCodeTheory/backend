import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuestionChoiceService } from './user-question-choice.service';
import { CreateUserQuestionChoiceDto } from './dto/create-user-question-choice.dto';
import { UpdateUserQuestionChoiceDto } from './dto/update-user-question-choice.dto';

@Controller('user-question-choice')
export class UserQuestionChoiceController {
  constructor(private readonly userQuestionChoiceService: UserQuestionChoiceService) {}

  @Post()
  create(@Body() createUserQuestionChoiceDto: CreateUserQuestionChoiceDto) {
    return this.userQuestionChoiceService.create(createUserQuestionChoiceDto);
  }

  @Get()
  findAll() {
    return this.userQuestionChoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQuestionChoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuestionChoiceDto: UpdateUserQuestionChoiceDto) {
    return this.userQuestionChoiceService.update(+id, updateUserQuestionChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuestionChoiceService.remove(+id);
  }
}
