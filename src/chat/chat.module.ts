import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { APP_GUARD } from '@nestjs/core';
import { WsGuard } from './guards/ws.guard';
import { UserSchema } from '../users/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }, { name: 'Users', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret
    })],
  providers: [ChatGateway, ChatService],
})

export class ChatModule {

}
