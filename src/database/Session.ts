import { model, Schema } from 'mongoose';
import { SessionInterface } from '../interfaces/interfaces.shema';

const sessionSchema = new Schema<SessionInterface>({
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
