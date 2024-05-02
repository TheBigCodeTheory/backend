import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(createAuthDto: CreateAuthDto) {
    return await this.authRepository.register(createAuthDto.email);
  }

  private login(destination: string): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
