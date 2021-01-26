import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    console.log('validateUser', username, password);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const usr = await this.usersService.findUser(user.username);
    if (usr) {
      const payload = usr && { username: usr.username, sub: usr.id };
      console.log(usr);
      return {
        userId: usr.id,
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async register(user: any) {
    return {
      userId: await this.usersService.addUser(user.username, user.password),
    };
  }
}
