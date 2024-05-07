import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoObjectId } from 'src/lib/common/types';

export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(authId: string, createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel({ auth: authId, ...createUserDto });
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        console.log('EMAIL_ALREADY_EXISTS', error);
        throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }
      console.log('ERROR_CREATING_USER', error);
      throw new HttpException('ERROR_CREATING_USER', HttpStatus.BAD_REQUEST);
    }
  }

  async findAuth(auth: MongoObjectId): Promise<User> {
    try {
      return await this.userModel.findOne({ auth });
    } catch (error) {
      console.log('ERROR_FINDING_USER', error);
      throw new HttpException('ERROR_FINDING_USER', HttpStatus.BAD_REQUEST);
    }
  }
}
