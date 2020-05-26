import {Document} from 'mongoose';
import { UserStatus } from '../users.schema';

export interface IUser extends Document {
  id?: string,
  email: string,
  password?: string,
  status: UserStatus
}
