import { ObjectId } from 'mongoose';

export interface UserEntity {
  _id: ObjectId | string;
  name: string;
  email: string;
  password: string;
  age: number;
  roles: string;
}

export interface PostEntity {
  _id: ObjectId | string;
  text: string;
  userId: ObjectId | string;
  updateOn: string;
}

export interface SessionEntity {
  _id: ObjectId | string;
  refreshToken: string;
  user: UserEntity;
}
