import { MongoObjectId } from 'src/lib/common/types';

export class CreateTopicsQuestionsHistoryDto {
  topic?: MongoObjectId;
  userQuestionChoices?: MongoObjectId[];
}
