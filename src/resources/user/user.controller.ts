import {
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/lib/security/roles.guard';
import { Roles } from 'src/lib/security/roles.decorator';
import { ROLE } from 'src/lib/common/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Patch('/admin/:id')
  makeAdmin(@Param('id') id: ObjectId) {
    return this.userService.makeAdmin(id);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.USER])
  @Get('/me')
  getMe(@Request() req) {
    return this.userService.findById(req.user.id);
  }
}
