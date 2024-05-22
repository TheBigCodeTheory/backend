import { ObjectId } from 'mongoose';

export class CreateUserQuestionChoiceDto {
  questionId: ObjectId;
  choices: ObjectId[];
}
