import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ChoiceDocument = HydratedDocument<Choice>;

@Schema({ timestamps: true })
export class Choice extends Document {
  @Prop({ required: true, unique: true })
  description: {
    eng: string;
    spa: string;
  };
}

export const ChoiceSchema = SchemaFactory.createForClass(Choice);
