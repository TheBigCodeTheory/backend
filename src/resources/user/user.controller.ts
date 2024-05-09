import { Controller, Param, Patch, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Patch('/admin/:id')
  makeAdmin(@Param('id') id: ObjectId) {
    return this.userService.makeAdmin(id);
  }
}
