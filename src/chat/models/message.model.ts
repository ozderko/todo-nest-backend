import { Document } from 'mongoose';

export class Message {
  id?: string;
  from: string;
  to: string;
  date: Date;
  message: string;

  constructor(obj) {
    this.id = obj.id;
    this.from = obj.from;
    this.to = obj.to;
    this.date = obj.date;
    this.message = obj.message;
  }
}
