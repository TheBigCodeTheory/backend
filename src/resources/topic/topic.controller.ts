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
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/lib/security/roles.guard';
import { Roles } from 'src/lib/security/roles.decorator';
import { ROLE } from 'src/lib/common/types';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.ADMIN])
  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.ADMIN, ROLE.USER])
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
