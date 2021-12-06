import Joi from 'joi';
import constants from '../constants';

const signInValidator = Joi.object({
  email: Joi.string().regex(constants.emailRegex).trim().required(),
  password: Joi.string().regex(constants.passwordRegex).trim().required(),
});

export default signInValidator;
