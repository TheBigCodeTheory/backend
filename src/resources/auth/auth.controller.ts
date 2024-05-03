import { Body, Controller, Get, Post, Request, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  // @Version('1')
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // login(@Request() req, @Body() generateCodeDto: GenerateCodeDto) {
  //   return this.authService.login(req.user);
  // }
}
