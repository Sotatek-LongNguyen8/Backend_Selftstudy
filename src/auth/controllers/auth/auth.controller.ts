import {
  Controller,
  Post,
  UseGuards,
  Request,
  Session,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { localAuthGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(localAuthGuard)
  @Post('login')
  async login(@Request() req) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}
