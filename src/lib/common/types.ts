import { Types } from 'mongoose';

export type MongoObjectId = Types.ObjectId;
export enum ROLE {
  'ADMIN' = 'ADMIN',
  'USER' = 'USER',
}
