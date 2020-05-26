import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { ChatService } from '../chat.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private chatService: ChatService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = request.handshake.query;
    if(token['x-access-token']) {
      return this.chatService.validateToken(token['x-access-token']);
    }
    throw new Error('Token dont exist');
  }
}
