import { NextFunction, Request, Response } from 'express';
import User from '../database/User';
import HttpError from '../errors/http.error';
import userServices from '../services/user.service';
import userValidator from '../validators/user.validator';

export default {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await userServices.findAllUsers());
    } catch (e) {
      next(e);
    }
  },
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params) {
        throw new HttpError(400, 'Params is empty');
      }
      res.json(await userServices.findUserById(req.params.id));
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = userValidator.createUserValidator.validate(req.body.user);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }

      const { email } = req.body;

      const foundUser = await userServices.userByParam({ email });
      if (foundUser) {
        throw new HttpError(400, 'There is the same user');
      }

      const createdUser = await userServices.createUser(req.body);

      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curentUser = res.locals.user;
      const { id } = req.params as { id: string };
      const infoToUpdate = req.body;

      const { error } = userValidator.createUpdateUserValidator.validate(req.body);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }

      const foundUser: any = await userServices.userByParam({ _id: id });
      if (!foundUser) {
        throw new HttpError(404, 'User is not found');
      }

      if (curentUser.roles === 'admin') {
        res.json(await User.findByIdAndUpdate({ _id: id }, infoToUpdate));
        return;
      }

      if (curentUser.roles === 'user' && curentUser._id.toString() !== foundUser._id.toString()) {
        throw new HttpError(400, 'You can not update enother user');
      }

      const updatedUser = await userServices.findByIdAndUpdate(curentUser._id, infoToUpdate);

      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curentUser = res.locals.user;
      const { id } = req.params as { id: string };

      const foundUser: any = await userServices.userByParam({ _id: id });
      if (!foundUser) {
        throw new HttpError(404, 'User is not found');
      }

      if (foundUser.roles === 'admin') {
        throw new HttpError(400, 'This user is protected to removing');
      }

      if (curentUser.roles === 'admin') {
        res.json(await userServices.findByIdAndDelete(id));
        return;
      }

      if (curentUser.roles === 'user' && curentUser._id.toString() !== foundUser._id.toString()) {
        throw new HttpError(400, 'You can not delete enother user');
      }

      res.json(await userServices.findByIdAndDelete(id));
    } catch (e) {
      next(e);
    }
  },
};
