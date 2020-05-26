import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.status || exception.code || 500;
    const message = exception.message.error || exception.message;
    const name = exception.message.error || exception.name || 'Unknown Error';

    response
      .status(status)
      .json({status, name, message});
  }
}
