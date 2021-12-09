import Joi from 'joi';
import { EMAIL_REGEX, PASSWORD_REGEX } from './regex';

const signInValidator = Joi.object({
  email: Joi.string().regex(EMAIL_REGEX).trim().required(),
  password: Joi.string().regex(PASSWORD_REGEX).trim().required(),
});

export default signInValidator;
