import { FilterQuery, HydratedDocument } from 'mongoose';
import User from '../database/user.model';
import HttpError from '../errors/http.error';
import { UserEntity } from '../interfaces/database';

export async function findUserByQuery(param: FilterQuery<UserEntity>): Promise<HydratedDocument<UserEntity>> {
  return User.findOne(param);
}

export async function findAllUsers(): Promise<Array<HydratedDocument<UserEntity>>> {
  return User.find();
}

export async function findUserById(_id: string): Promise<HydratedDocument<UserEntity>> {
  return User.findById({ _id });
}

export async function createUser(user: UserEntity): Promise<HydratedDocument<UserEntity>> {
  const alreadyExists = await findUserByQuery({ email: user.email });
  if (alreadyExists) {
    throw new HttpError(400, 'There is the same user');
  }

  return User.create(user);
}

export async function findByIdAndUpdate(_id: string, params: UserEntity): Promise<HydratedDocument<UserEntity>> {
  return User.findByIdAndUpdate({ _id }, params);
}

export async function findByIdAndDelete(_id: string): Promise<HydratedDocument<UserEntity>> {
  return User.findByIdAndDelete({ _id });
}
