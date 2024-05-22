import {
  Controller,
  Param,
  Patch,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { TopicsQuestionsHistoryService } from './topics-questions-history.service';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/lib/security/roles.guard';
import { Roles } from 'src/lib/security/roles.decorator';
import { ROLE } from 'src/lib/common/types';
import { ObjectId } from 'mongoose';

@Controller('user-topic')
export class TopicsQuestionsHistoryController {
  constructor(
    private readonly topicsQuestionsHistoryService: TopicsQuestionsHistoryService,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.USER])
  @Patch('/:topicId')
  async addTopic(@Request() req, @Param('topicId') topicId: ObjectId) {
    return this.topicsQuestionsHistoryService.create(req.user.id, {
      topic: topicId,
    });
  }
}
