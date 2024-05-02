import { Body, Controller, Get, Post, Request, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GenerateCodeDto } from './dto/send-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Version('1')
  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  // TODO Utilizar passport passwordless para login. No se si handlea todo en un solo endpoint (cosa que veo raro que sea asi)
  // TODO Si no se handlea todo en un endpoint, crear otro de login/callback para cuando el user inserte el codigo
  //

  // @Version('1')
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // login(@Request() req, @Body() generateCodeDto: GenerateCodeDto) {
  //   return this.authService.login(req.user);
  // }
}
