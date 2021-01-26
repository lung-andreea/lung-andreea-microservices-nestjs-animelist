import { Controller, Get } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistWsGateway } from './watchlist-ws.gateway';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Anime } from './anime.model';

@Controller()
export class WatchlistController {
  private interval;

  constructor(
    private readonly watchlistService: WatchlistService,
    private readonly watchlistWsGateway: WatchlistWsGateway,
  ) {}

  @MessagePattern('addToWatchlist')
  async addToWatchlist(data: Record<string, any>): Promise<any> {
    console.log('addToWatchlist', data);
    return await this.watchlistService.addToWatchlist(data.userId, data.anime);
    // this.itemWsGateway.broadcast({ event: 'created', payload: item });
  }

  @MessagePattern('getWatchlistForUser')
  async getWatchlistForUser(userId: string): Promise<any> {
    console.log('getWatchlistForUser', userId);
    return await this.watchlistService.getWatchlistForUser(userId);
  }

  @MessagePattern('updateAnime')
  async updateAnime(data: Record<string, any>): Promise<any> {
    console.log('updateAnime', data.userId, data.animeId);
    return await this.watchlistService.updateAnime(
      data.userId,
      data.animeId,
      data.newAnimeObject,
    );
  }

  @MessagePattern('deleteAnime')
  async deleteAnime(animeId: string): Promise<any> {
    return await this.watchlistService.deleteAnime(animeId);
  }

  @EventPattern('startRetrievingNews')
  async retrieveNews(userId: string) {
    console.log('startRetrievingNews', userId);
    const allAnime = await this.watchlistService.getWatchlistForUser(userId);
    const options = [
      ' got a new sequel!',
      ' is getting a new season!',
      ' is getting an action movie!',
      ' has just announced plans for a studio change!',
      ' is getting re-adapted!',
    ];
    this.interval = setInterval(() => {
      this.watchlistWsGateway.alertNews(allAnime[0].title + options[0]);
    }, 3000);
  }

  @EventPattern('stopRetrievingNews')
  stopRetrievingNews(userId: string) {
    clearInterval(this.interval);
  }
}
