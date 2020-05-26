export class HttpError {
  constructor(public code: number, public name: string, public message:string) {
  }
}

export function throwHttpError(code: number, name: string, message: string, previousErr?: any): any {
  if (previousErr) {
    code = previousErr.code || code;
    name = previousErr.name || name;
    message = previousErr.message ? message + `: ${previousErr.message}` : message;
  }
  throw new HttpError(code, name, message);
}

export function throwBadRequestError(message: string, previousErr?: any): any {
  throwHttpError(400, 'Bad Request', message, previousErr);
}

export function throwBadRequestErrorIf(message: string, condition: boolean, previousErr?: any): any {
  console.log('inside!!!')
  if(condition) {
    console.log('insiddddddeee!!')
    throwBadRequestError(message, previousErr);
  }
}
