import { Request, Response } from 'express';
import HttpError from '../errors/http.error';
import { Roles } from '../interfaces/authentication';
import * as userService from '../services/user.service';
import normalizeUser from '../utils/user.util';
import userValidator from '../validators/user.validator';

export async function getUsers(req: Request, res: Response) {
  return res.json(await userService.findAllUsers());
}

export async function getUser(req: Request, res: Response) {
  if (!req.params.id) {
    throw new HttpError(400, 'Params is empty');
  }
  return res.json(await userService.findUserById(req.params.id));
}

export async function createUser(req: Request, res: Response) {
  const { error } = userValidator.createUserValidator.validate(req.body);
  if (error) {
    throw new HttpError(400, error.details[0].message);
  }

  const createdUser = await userService.createUser(req.body);

  return res.json(normalizeUser(createdUser));
}

export async function updateUser(req: Request, res: Response) {
  const { session } = res.locals;
  const { id } = req.params as { id: string };
  const infoToUpdate = req.body;

  const { error } = userValidator.createUpdateUserValidator.validate(infoToUpdate);
  if (error) {
    throw new HttpError(400, error.details[0].message);
  }

  const foundUser: any = await userService.findUserById(id);
  if (!foundUser) {
    throw new HttpError(404, 'User is not found');
  }

  if (session.user.roles === Roles.Admin) {
    return res.json(await userService.findByIdAndUpdate(id, infoToUpdate));
  }

  if (session.user.roles === Roles.User && session.user._id.toString() !== foundUser._id.toString()) {
    throw new HttpError(400, 'You can not update another user');
  }

  const updatedUser = await userService.findByIdAndUpdate(session.user._id, infoToUpdate);

  return res.json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
  const { session } = res.locals;
  const { id } = req.params as { id: string };

  const foundUser: any = await userService.findUserById(id);
  if (!foundUser) {
    throw new HttpError(404, 'User is not found');
  }

  if (foundUser.roles === Roles.Admin) {
    throw new HttpError(400, 'This user is protected to removing');
  }

  if (session.user.roles === Roles.Admin) {
    return res.json(await userService.findByIdAndDelete(id));
  }

  if (session.user.roles === Roles.User && session.user._id.toString() !== foundUser._id.toString()) {
    throw new HttpError(400, 'You can not delete Another user');
  }

  return res.json(await userService.findByIdAndDelete(id));
}
