import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { MailService } from '../mail/mail.service';
import { isCodeExpired } from '../utils/code';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    // private readonly userService: UserService,
  ) {}

  async login(
    email: string,
    code: string,
  ): Promise<{ token: string; user: any }> {
    const auth: Auth = await this.authRepository.findByEmailCode(email, code);
    if (!auth || isCodeExpired(auth!.createdAt))
      throw new Error('Wrong email or code.');
    // const user = await this.userService.getOrCreate(loginData);
    await this.authRepository.deleteByEmail(email);
    return this.generateToken('user');
  }

  async sendCode(email: string): Promise<Auth> {
    const authUser: Auth = await this.authRepository.getOrCreateAuthCode(email);
    await this.mailService.sendVerificationCode(email, authUser!.code);
    return authUser;
  }

  async generateToken(payload: any): Promise<{ token: string; user: any }> {
    // const payload = { id: user.id, name: user.name };
    return { token: this.jwtService.sign(payload), user: payload };
  }
}
