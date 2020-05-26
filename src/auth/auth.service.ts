import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../users/models/user.interface';
import { AuthDto } from './models/auth.dto';
import { UserStatus } from '../users/users.schema';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { AuthResultDto } from './models/auth-result.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Users') private userModel: Model<IUser>,
              private jwtService: JwtService) {
  }

  async login(data: AuthDto): Promise<AuthResultDto | string> {
    let user = await this.userModel.findOne({ email: data.email, status: UserStatus.Registered }).exec();
    if (user && user.password === data.password) {
      return this.createUserToken(user._id);
    } else {
      return 'invalid';
    }
  }

  async createUserToken(userId: ObjectId): Promise<AuthResultDto> {
    const accessToken = this.jwtService.sign({ id: userId.toHexString() }, { expiresIn: '2d' });
    const refreshToken = this.jwtService.sign({ id: userId.toHexString() }, { expiresIn: '60d' });
    return { accessToken, refreshToken };
  }
}
