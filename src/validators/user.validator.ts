import Joi from 'joi';
import constants from '../constants';

export default {
  createUserValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(30).required(),
    email: Joi.string().regex(constants.emailRegex).trim().required(),
    password: Joi.string().regex(constants.passwordRegex).trim().required(),
    age: Joi.number().min(10).max(130).required(),
  }),
  createUpdateUserValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(30),
    email: Joi.string().regex(constants.emailRegex).trim(),
    password: Joi.string().regex(constants.passwordRegex).trim(),
    age: Joi.number().min(10).max(130),
  }),
};
