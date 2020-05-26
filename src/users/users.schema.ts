import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

export enum UserStatus {
  ConfirmationWait = 'ConfirmationWait',
  Registered = 'Registered'
}

export const UserSchema = new mongoose.Schema({
  email: { type: Types.String, unique: true, required: true },
  password: { type: Types.String, required: true },
  status: { type: UserStatus, default: UserStatus.ConfirmationWait },
});
