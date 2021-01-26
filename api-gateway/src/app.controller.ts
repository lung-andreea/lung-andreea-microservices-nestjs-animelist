import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/local-auth.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('anime/search')
  async searchAnime(@Body('query') query: string) {
    return await this.appService.getAllAnimeForQuery(query);
  }

  @Get('watchlist/user/:userId')
  async getWatchlistForUser(@Param('userId') userId: string) {
    return await this.appService.getWatchlistForUser(userId);
  }

  @Post('watchlist/user/:userId')
  async addToWatchlist(@Param('userId') userId: string, @Body() animeObject) {
    return await this.appService.addToWatchlist(userId, animeObject);
  }

  @Put('watchlist/user/:userId/anime/:animeId')
  async updateAnime(
    @Param('userId') userId: string,
    @Param('animeId') animeId: string,
    @Body() newAnimeObject,
  ) {
    return await this.appService.updateAnime(userId, animeId, newAnimeObject);
  }

  @Delete('watchlist/user/:userId/anime/:animeId')
  async deleteAnime(
    @Param('userId') userId: string,
    @Param('animeId') animeId: string,
  ) {
    return await this.appService.deleteAnime(animeId);
  }

  @Get('news/:userId')
  startRetrievingNews(@Param('userId') userId: string) {
    this.appService.startRetrievingNews(userId);
  }

  @Delete('news/:userId')
  stopRetrievingNews(@Param('userId') userId: string) {
    this.appService.stopRetrievingNews(userId);
  }
}
