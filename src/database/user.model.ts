import { model, Schema } from 'mongoose';
import { Roles } from '../interfaces/authentication';
import { UserEntity } from '../interfaces/database';

const userSchema = new Schema<UserEntity>({
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
    default: Roles.User,
    enum: [Roles.User, Roles.Admin],
    require: true,
    trim: true,
  },
});

const User = model('user', userSchema);
export default User;
