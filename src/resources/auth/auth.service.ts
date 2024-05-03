import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { MailService } from '../mail/mail.service';
import { isCodeExpired } from '../utils/code';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<User> {
    const auth = await this.authRepository.register(createAuthDto.email);
    return await this.userService.create(auth!._id, createAuthDto);
  }

  async login(destination: string) {
    const code = this.generateCode();
    // todo updatear el code en el siguiente repository.
    return await this.authRepository.login(destination, code);
  }
  private generateCode(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
