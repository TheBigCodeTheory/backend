import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GenerateCodeDto } from './dto/send-email.dto';
import { GetTokenDto } from './dto/get-token';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { RolesGuard } from 'src/lib/security/roles.guard';
import { Roles } from 'src/lib/security/roles.decorator';
import { ROLE } from 'src/lib/common/types';
import { DbRepository } from '../db/db.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly dbRepository: DbRepository,
  ) {}

  @Version('1')
  @Post('/register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    const session = await this.dbRepository.getSessionWithTransaction();
    try {
      const response = await this.authService.register(CreateUserDto, session);
      await session.commitTransaction();
      return response;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  @Version('1')
  @Post('/code')
  code(@Body() generateCodeDto: GenerateCodeDto) {
    return this.authService.sendVerificationCode(generateCodeDto);
  }

  @Version('1')
  @Post('/token')
  token(@Body() getTokenDto: GetTokenDto) {
    return this.authService.getToken(getTokenDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ROLE.USER])
  @Delete('/user')
  async deleteUser(@Request() req) {
    const session = await this.dbRepository.getSessionWithTransaction();
    try {
      const response = await this.authService.deleteAuthUser(
        req.user.id,
        session,
      );
      await session.commitTransaction();
      return response;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }
}
