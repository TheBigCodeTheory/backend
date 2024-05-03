import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';

import { Question } from '../../question/entities/question.entity';

export type TopicDocument = HydratedDocument<Topic>;

@Schema({ timestamps: true })
export class Topic extends Document {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  icon: string;
  @Prop({ required: true })
  level: number;
  @Prop({ required: true })
  color: string; // enum later
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
