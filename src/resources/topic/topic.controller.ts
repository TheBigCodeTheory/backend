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
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ObjectId } from 'mongoose';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Version('1')
  // @UseGuards() // esto para mas adelante, para que chequee que el que lo hace sea "ADMIN"
  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }
  @Version('1')
  @Get()
  findAll() {
    return this.topicService.findAll();
  }
  @Version('1')
  @Get(':id')
  findById(@Param('id') id: ObjectId) {
    return this.topicService.findById(id);
  }
  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}