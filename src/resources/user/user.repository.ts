import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, ObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoObjectId, ROLE } from '../../lib/common/types';

export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    authId: string,
    createUserDto: CreateUserDto,
    session?: ClientSession,
  ): Promise<User> {
    try {
      const user = new this.userModel({ auth: authId, ...createUserDto });
      return await user.save({ session });
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

  async addUserTopic(
    userId: MongoObjectId,
    topicsQuestionHistoryId: MongoObjectId,
    session: ClientSession,
  ): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        {
          $push: { topicsQuestionsHistory: topicsQuestionHistoryId },
        },
        { session },
      );
    } catch (error) {
      console.log('ERROR_ADDING_USER_TOPIC', error);
      throw new HttpException(
        'ERROR_ADDING_USER_TOPIC',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(userId: MongoObjectId): Promise<User> {
    try {
      return await this.userModel.findById(userId);
    } catch (error) {
      console.log('ERROR_FINDING_USER', error);
      throw new HttpException('ERROR_FINDING_USER', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(userId: MongoObjectId, session?: ClientSession): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(userId, { session });
    } catch (error) {
      console.log('ERROR_DELETING_USER', error);
      throw new HttpException('ERROR_DELETING_USER', HttpStatus.BAD_REQUEST);
    }
  }

  async makeAdmin(id: ObjectId) {
    try {
      const updated = await this.userModel.updateOne(
        { _id: id, roles: { $ne: ROLE.ADMIN } },
        {
          $addToSet: { roles: ROLE.ADMIN },
        },
      );

      if (updated.matchedCount == 0) {
        console.log(
          'ERROR_ALREADY_ADMIN_OR_BAD_ID',
          'MATCHED_COUNT_EQUAL_ZERO',
        );
        throw new HttpException(
          'ERROR_ALREADY_ADMIN_OR_BAD_ID',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      if (error.message) {
        throw error;
      }
      console.log('ERROR_MAKING_ADMIN', error);
      throw new HttpException('ERROR_MAKING_ADMIN', HttpStatus.BAD_REQUEST);
    }
  }
}
