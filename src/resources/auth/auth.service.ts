import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GenerateCodeDto } from './dto/send-email.dto';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { GetTokenDto } from './dto/get-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const code = this.generateCode();
    const auth = await this.authRepository.create(createUserDto.email, code);
    const user = await this.userService.create(auth!._id, createUserDto);
    await this.mailService.sendVerificationCode(createUserDto!.email, code);
    return user;
  }

  async sendVerificationCode(generateCode: GenerateCodeDto): Promise<void> {
    const { email } = generateCode;
    const code = this.generateCode();
    await this.authRepository.updateCode(email, code);
    return await this.mailService.sendVerificationCode(email, code);
  }

  async getToken(
    getTokenDto: GetTokenDto,
  ): Promise<{ token: string; user: any }> {
    const auth = await this.authRepository.getToken(getTokenDto);
    const user = await this.userService.findAuth(auth._id);
    const payload = { id: String(user._id), name: user.firstname };
    return { token: this.jwtService.sign(payload), user: payload };
  }

  private generateCode(): string {
    return String(
      Math.ceil(Math.random() * 9) * 100000 + Math.ceil(Math.random() * 9999),
    );
  }
}
