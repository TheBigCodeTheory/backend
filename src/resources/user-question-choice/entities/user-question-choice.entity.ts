import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';

import { Question } from '../../question/entities/question.entity';

export type UserQuestionChoiceDocument = HydratedDocument<UserQuestionChoice>;

@Schema({ timestamps: true })
export class UserQuestionChoice extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: Question;
  /**
   * @description show the choices selected by the user in case that i want to show that in the UI history.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Choice' }], default: [] })
  choicesSelected: UserQuestionChoice[];
  /**
   * @description save if the answers are correct or not (all the content, true/false, not 1 of 2 options correct.
   *  If 1 is wrong the result is wrong) with this is not necessary to call the Choice collection every time to check if the answer is correct
   *
   */
  @Prop()
  result: boolean;
}

export const UserQuestionChoiceSchema =
  SchemaFactory.createForClass(UserQuestionChoice);
