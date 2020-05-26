import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

export const MessageSchema = new mongoose.Schema({
  from: {type: ObjectId},
  to: {type: ObjectId},
  date: Date,
  message: {type: String}
});
