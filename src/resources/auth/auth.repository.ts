import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { expirationTime, generateCode, isCodeExpired } from '../utils/code';

export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async register(email: string): Promise<Auth> {
    try {
      const newAuth = new this.authModel({
        email,
      });
      return await newAuth.save();
    } catch (error) {
      if (error.code === 11000) {
        // the code 11000 is the error code for duplicate key in mongo
        console.log('EMAIL_ALREADY_EXISTS', error);
        throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }
      console.log('ERROR_CREATING_AUTH', error);
      throw new HttpException('ERROR_CREATING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }
  async login(email: string, password: string): Promise<Auth> {
    try {
      //TODO reemplazar esta logica que es para password, no passwordless.
      const auth = await this.authModel
        .findOne({
          email: email,
          password: password,
        })
        .exec();
      if (!auth) {
        throw new Error('WRONG_CREDENTIALS');
      }
      return auth;
    } catch (error) {
      if (error.message) {
        console.log('WRONG_CREDENTIALS', error);
        throw new HttpException('WRONG_CREDENTIALS', HttpStatus.UNAUTHORIZED);
      }
      console.log('ERROR_AUTH_LOGIN', error);
      throw new HttpException('ERROR_AUTH_LOGIN', HttpStatus.BAD_REQUEST);
    }
  }

  // SOFI

  async findByEmailCode(email: string, code: string): Promise<Auth> {
    try {
      return this.authModel.findOne({ email, code });
    } catch (error) {
      console.log('ERROR_FINDING_AUTH', error);
      throw new HttpException('ERROR_FINDING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteByEmail(email: string): Promise<Auth> {
    try {
      return this.authModel.findOneAndDelete({ email });
    } catch (error) {
      console.log('ERROR_DELETING_AUTH', error);
      throw new HttpException('ERROR_DELETING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }

  async getOrCreateAuthCode(email: string): Promise<Auth> {
    try {
      const code = generateCode();
      const auth = await this.authModel.findOne({ email });
      if (!auth)
        return this.authModel.create({ email, code, createdAt: new Date() });
      if (isCodeExpired(auth.createdAt)) {
        return this.authModel.findOneAndUpdate(
          { email },
          {
            code,
            createdAt: new Date(),
          },
        );
      }
      return auth;
    } catch (error) {
      console.log('ERROR_CREATING_AUTH', error);
      throw new HttpException('ERROR_CREATING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }

  async cleanupExpiredCodes(): Promise<void> {
    await this.authModel.deleteMany({
      createdAt: { $lt: new Date(Date.now() - expirationTime) },
    });
  }
}
