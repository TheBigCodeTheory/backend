import { MongoObjectId } from './types';

export interface IEntity {
  _id: MongoObjectId;
  createdAt: Date;
  updatedAt: Date;
}
