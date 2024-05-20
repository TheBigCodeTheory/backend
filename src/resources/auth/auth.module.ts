import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { jwtSecret } from './passport/constant';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { MailerService } from '../mail/mailer.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { DbModule } from '../db/db.module';
import { TopicsQuestionsHistoryModule } from '../topics-questions-history/topics-questions-history.module';
import { TopicsQuestionsHistoryService } from '../topics-questions-history/topics-questions-history.service';

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
    DbModule,
    TopicsQuestionsHistoryModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    UserService,
    TopicsQuestionsHistoryService,
    MailerService,
    JwtStrategy,
  ],
  exports: [AuthService, AuthRepository, MongooseModule],
})
export class AuthModule {}
