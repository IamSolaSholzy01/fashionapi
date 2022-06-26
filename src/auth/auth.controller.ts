import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerdto';
import { ResendDto, TokenDto } from './dto/tokendto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'User email',
          example: 'test@test.com',
        },
        password: {
          type: 'string',
          description: 'User password',
        },
      },
    },
  })
  @Public()
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('/verify')
  async verify(@Body() tokenDto: TokenDto) {
    return this.authService.verify(tokenDto);
  }

  @Public()
  @Post('/resend')
  async resend(@Body() tokenDto: ResendDto) {
    return this.authService.resend(tokenDto);
  }
}
