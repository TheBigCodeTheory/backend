import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ROLE } from '../../../lib/common/types';
import { Auth } from '../../../resources/auth/entities/auth.entity';
import { TopicsQuestionsHistory } from 'src/resources/topics-questions-history/entities/topics-questions-history.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @IsString()
  @Prop({ required: true })
  firstname: string;

  @IsString()
  @Prop({ required: false })
  lastname: string;

  @IsEmail()
  @Prop({ unique: true, required: true })
  email: string;

  @IsEnum(ROLE)
  @Prop({ required: true, default: ROLE.USER })
  roles: ROLE[];

  @Prop({ unique: true, type: Types.ObjectId, ref: 'Auth' })
  auth: Auth;

  @Prop({ type: Types.ObjectId, ref: 'TopicsQuestionsHistory' })
  topicsQuestionsHistory: TopicsQuestionsHistory[];
}

export const UserSchema = SchemaFactory.createForClass(User);
