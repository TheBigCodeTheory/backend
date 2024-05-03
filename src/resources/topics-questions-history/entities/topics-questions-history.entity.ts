import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { Topic } from '../../topic/entities/topic.entity';
import { UserQuestionChoice } from '../../user-question-choice/entities/user-question-choice.entity';

export type TopicsQuestionsHistoryDocument =
  HydratedDocument<TopicsQuestionsHistory>;

@Schema({ timestamps: true })

/**
 * @description the user will create a register in this collection per each topic selected per user.
 * Here we have the topic selected (an objectID where the populate brings the information) and the user answers to this topic
 */
export class TopicsQuestionsHistory extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Topic' }] })
  topic: Topic;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserQuestionChoice' }] })
  userQuestionChoices: UserQuestionChoice[];
}

export const TopicsQuestionsHistorySchema = SchemaFactory.createForClass(
  TopicsQuestionsHistory,
);
