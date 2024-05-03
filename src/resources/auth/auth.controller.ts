import { Body, Controller, Get, Post, Request, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GenerateCodeDto } from './dto/send-email.dto';
import { GetTokenDto } from './dto/get-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('/register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
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
}
