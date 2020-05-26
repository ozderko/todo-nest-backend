import { JwtService } from '@nestjs/jwt';

export function getUserIdFromToken(token: any): void {
  const decoded = JwtService.prototype.decode(token);
  const decToStr = JSON.stringify(decoded);
  const decToJSON = JSON.parse(decToStr);
  const tokenUserId = decToJSON.id;
  return tokenUserId;
}
