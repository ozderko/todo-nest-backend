import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

export const ProjectSchema = new mongoose.Schema({
  u_id: {type: ObjectId},
  name: String,
  todos: [{
    type: ObjectId,
    ref: 'Todo'
  }]
});
