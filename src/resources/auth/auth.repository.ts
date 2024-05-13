import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { GetTokenDto } from './dto/get-token';

export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async create(email: string, code: string): Promise<Auth> {
    try {
      const newAuth = new this.authModel({
        email,
        code,
      });
      return await newAuth.save();
    } catch (error) {
      if (error.code === 11000) {
        console.log('EMAIL_ALREADY_EXISTS', error);
        throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }
      console.log('ERROR_CREATING_AUTH', error);
      throw new HttpException('ERROR_CREATING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<Auth | null> {
    try {
      const auth = await this.authModel.findOne({ email }).exec();
      if (!auth) throw new Error();
      return auth;
    } catch (error) {
      console.log('ERROR_FINDING_AUTH', error);
      throw new HttpException('ERROR_FINDING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }

  async updateCode(email: string, code: string): Promise<Auth> {
    try {
      await this.findByEmail(email);
      return await this.authModel
        .findOneAndUpdate({ email }, { code }, { new: true })
        .exec();
    } catch (error) {
      console.log('ERROR_UPDATE_CODE_LOGIN', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getToken(getTokenDto: GetTokenDto): Promise<Auth> {
    try {
      const auth = await this.authModel.findOne(getTokenDto).exec();
      if (!auth) throw new Error('WRONG_CREDENTIALS');
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

  async delete(authId: string, session?: ClientSession): Promise<Auth> {
    try {
      return await this.authModel.findByIdAndDelete(authId, {
        session,
      });
    } catch (error) {
      console.log('ERROR_DELETING_AUTH', error);
      throw new HttpException('ERROR_DELETING_AUTH', HttpStatus.BAD_REQUEST);
    }
  }
}
