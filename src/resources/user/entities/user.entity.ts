import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Auth } from 'src/resources/auth/entities/auth.entity';

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

  @Prop({ uique: true, type: Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const UserSchema = SchemaFactory.createForClass(User);
