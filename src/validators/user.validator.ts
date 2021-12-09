import Joi from 'joi';
import { EMAIL_REGEX, PASSWORD_REGEX } from './regex';

export default {
  createUserValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(30).required(),
    email: Joi.string().regex(EMAIL_REGEX).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEX).trim().required(),
    age: Joi.number().min(10).max(130).required(),
  }),
  createUpdateUserValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(30),
    email: Joi.string().regex(EMAIL_REGEX).trim(),
    password: Joi.string().regex(PASSWORD_REGEX).trim(),
    age: Joi.number().min(10).max(130),
  }),
};
