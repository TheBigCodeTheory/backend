import { HttpException, HttpStatus } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';

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
}
