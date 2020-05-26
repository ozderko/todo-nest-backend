import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsGuard } from './guards/ws.guard';
import { WsCurrentUser } from '../utils/decorators/ws-current-user.decorator';
import { IMessageSend } from './models/message-send.interface';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {

  }

  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  async handleMessage(@WsCurrentUser() currentUser: string, @ConnectedSocket() client: Socket, @MessageBody() data: IMessageSend): Promise<void>{
    if(data && !data.message) {
      return;
    }
    const message = await this.chatService.saveMessage(currentUser, data);
    await this.server.emit('message',message)
  }

  handleConnection(client): any {
    this.logger.log('New client connected ' + client.id);

  }

  handleDisconnect(client): any {
    this.logger.log('Client disconected ' + client.id);
  }
}
