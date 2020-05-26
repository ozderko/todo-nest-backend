import { Document } from 'mongoose';

export interface IMessage extends Document {
  id?: string,
  to: string,
  from: string,
  date: Date,
  message: string;
}
