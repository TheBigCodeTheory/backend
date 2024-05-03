import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { jwtSecret } from './passport/constant';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: (await jwtSecret()).secret,
        signOptions: { expiresIn: '36000s' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, MailService, UserService],
  exports: [AuthService, AuthRepository, MongooseModule],
})
export class AuthModule {}
