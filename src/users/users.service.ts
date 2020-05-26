import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IUser } from './models/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<IUser>) {}

  async findOne(email: string) {
    return this.userModel.find(user => user.email === email);
  }
}
