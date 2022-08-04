import { Controller, Request, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
