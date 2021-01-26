import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = { username: username, password: password };
    console.log('Username and password', user);
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = { username: username, password: password };
    return await this.authService.register(user);
  }
}
