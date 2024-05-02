import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(createAuthDto: CreateAuthDto) {
    const auth = await this.authRepository.register(createAuthDto.email);

    // todo crear el user con los datos ingresados y el auth._id para tener la relacion entre ambas tablas, primero hay que crear el resource user -> nest g resource user --no-spec.
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
