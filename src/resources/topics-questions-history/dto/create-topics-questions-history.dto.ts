import { ObjectId } from 'mongoose';
import { MongoObjectId } from 'src/lib/common/types';

export class CreateTopicsQuestionsHistoryDto {
  topic: ObjectId;
  userQuestionChoices?: MongoObjectId[];
}
