import {
  Controller,
  Post,
  UseGuards,
  Session,
  Get,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { localAuthGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(localAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getAuthStatus(@Request() req): string {
    return req.user;
  }
}
