import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ChoiceDocument = HydratedDocument<Choice>;

@Schema({ timestamps: true })
export class Choice extends Document {
  @Prop({ required: true, unique: true, type: { eng: String, spa: String } })
  description: {
    eng: string;
    spa: string;
  };

  @Prop({ required: true })
  correct: boolean;
}

export const ChoiceSchema = SchemaFactory.createForClass(Choice);
