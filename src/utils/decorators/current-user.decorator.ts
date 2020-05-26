import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(async (data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  const token = request.user;
  // const token = req.headers['x-access-token'] || req.headers['x-refresh-token'];
  return token.id;
});
