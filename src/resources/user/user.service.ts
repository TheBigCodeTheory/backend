import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MongoObjectId, ROLE } from 'src/lib/common/types';
import { ClientSession, ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(authId: string, createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(authId, createUserDto);
  }

  async findAuth(auth: MongoObjectId) {
    return await this.userRepository.findAuth(auth);
  }
  async findById(userId: MongoObjectId) {
    return await this.userRepository.findById(userId);
  }
  async makeAdmin(id: ObjectId) {
    await this.userRepository.makeAdmin(id);
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(userId: MongoObjectId, session?: ClientSession) {
    return await this.userRepository.delete(userId, session);
  }
}
