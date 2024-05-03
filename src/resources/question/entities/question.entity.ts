import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { Choice } from '../../choice/entities/choice.entity';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true, unique: true })
  name: {
    eng: string;
    spa: string;
  };
  @Prop({ required: true })
  questionDescription: {
    eng: string;
    spa: string;
  };
  @Prop({ required: true })
  type: string; // enum text,code,img
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Choice' }], default: [] })
  choices: Choice[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Choice' }], default: [] })
  correctChoices: Choice[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
