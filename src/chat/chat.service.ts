import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../users/models/user.interface';
import { JwtService } from '@nestjs/jwt';
import { IMessage } from './models/message.interface';
import { IMessageSend } from './models/message-send.interface';
import { Message } from './models/message.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Users') private userModel: Model<IUser>,@InjectModel('Message') private messageModel: Model<IMessage> , private jwtService: JwtService,) {
  }

  async validateToken(token: string) {
    const decodeToken: any = this.jwtService.decode(token);
    const user = await this.userModel.findOne({ '_id': decodeToken.id }).exec();
    if(user) {
      return true;
    }
    throw new Error('Invalid Token')
  }

  async saveMessage(currentUser: string, data: IMessageSend) {
    const user = await this.userModel.findOne({'email': data.email}).exec();
    const date = new Date().toLocaleString();
    const message = new Message({from: currentUser, to: user._id, date: date, message: data.message});
    const createdMessage = new this.messageModel(message);
    return await createdMessage.save();
  }
}
