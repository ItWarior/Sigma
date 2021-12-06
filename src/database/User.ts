import { model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/interfaces.shema';
import constants from '../constants';

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    select: false,
  },
  age: {
    type: Number,
    require: true,
    trim: true,
  },
  roles: {
    type: String,
    default: constants.roles.user,
    enum: constants.roles,
    require: true,
    trim: true,
  },
});

const User = model('user', userSchema);
export default User;
