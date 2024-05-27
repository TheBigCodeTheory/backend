import {
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UserQuestionChoiceService } from './user-question-choice.service';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/lib/security/roles.guard';
import { Roles } from 'src/lib/security/roles.decorator';
import { ROLE } from 'src/lib/common/types';
import { ObjectId } from 'mongoose';

@Controller('user-question')
export class UserQuestionChoiceController {
  constructor(
    private readonly userQuestionChoiceService: UserQuestionChoiceService,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.USER])
  @Post('/:questionId')
  async addTopic(@Request() req, @Param('questionId') questionId: ObjectId) {}
}
