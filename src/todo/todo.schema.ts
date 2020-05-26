import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

export const TodoSchema = new mongoose.Schema({
  u_id: {type: ObjectId},
  name: String,
  description: String,
  selected: Boolean,
  markers: [{color: String}]
});
