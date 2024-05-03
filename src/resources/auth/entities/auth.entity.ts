import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth extends Document {
  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @Prop({ required: false })
  code: string;

  @Prop({ required: false })
  magicLink: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
