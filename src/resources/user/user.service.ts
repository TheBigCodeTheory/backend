import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MongoObjectId } from 'src/lib/common/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(authId: string, createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(authId, createUserDto);
  }

  async findAuth(auth: MongoObjectId) {
    return await this.userRepository.findAuth(auth);
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
