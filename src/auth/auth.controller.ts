import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './models/auth.dto';
import { AuthService } from './auth.service';
import { AuthResultDto } from './models/auth-result.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: AuthDto): Promise<AuthResultDto | string> {
    return await this.authService.login(data);
  }

}
