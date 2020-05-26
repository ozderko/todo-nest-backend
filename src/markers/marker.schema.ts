import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

export const MarkerSchema = new mongoose.Schema({
  u_id: {type: ObjectId},
  name: String,
  color: String,
});
