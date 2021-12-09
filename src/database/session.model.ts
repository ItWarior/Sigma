import { model, Schema } from 'mongoose';
import { SessionEntity } from '../interfaces/database';

const sessionSchema = new Schema<SessionEntity>({
  refreshToken: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

const Session = model('session', sessionSchema);
export default Session;
