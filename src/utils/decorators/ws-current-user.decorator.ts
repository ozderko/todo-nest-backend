import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getUserIdFromToken } from '../auth/auth.utils';

export const WsCurrentUser = createParamDecorator(async (data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  const token = request.handshake.query['x-access-token'];
  return getUserIdFromToken(token);
});
