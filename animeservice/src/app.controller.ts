import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getAllAnimeForQuery')
  async getAllAnimeForQuery(query: string): Promise<JSON[]> {
    return await this.appService.getAllAnimeForQuery(query);
  }

  @MessagePattern('getAnimeWithId')
  async getAnimeWithId(mal_id: number): Promise<any> {
    return await this.appService.getAnimeWithId(mal_id);
  }
}
