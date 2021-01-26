import {Inject, Injectable, Param} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ANIME_SERVICE')
    private readonly animeService: ClientProxy,
    @Inject('WATCHLIST_SERVICE')
    private readonly watchlistService: ClientProxy,
  ) {}

  async getAllAnimeForQuery(query: string) {
    const result = await this.animeService.send<string>(
      'getAllAnimeForQuery',
      query,
    );
    return result;
  }

  async getWatchlistForUser(userId: string) {
    const result = await this.watchlistService.send<string>(
      'getWatchlistForUser',
      userId,
    );
    return result;
  }

  async addToWatchlist(userId: string, animeObject: Record<string, any>) {
    console.log(userId, animeObject);
    return this.watchlistService.send<Record<string, any>>('addToWatchlist', {
      userId: userId,
      anime: animeObject,
    });
  }

  async getAnimeWithId(animeId: number) {
    const res = await this.animeService.send<number>('getAnimeWithId', animeId);
    return res;
  }

  async updateAnime(
    userId: string,
    animeId: string,
    newAnimeObject: Record<string, any>,
  ) {
    return this.watchlistService.send<Record<string, any>>('updateAnime', {
      userId: userId,
      animeId: animeId,
      newAnimeObject: newAnimeObject,
    });
  }

  async deleteAnime(animeId: string) {
    return this.watchlistService.send<string>('deleteAnime', animeId);
  }

  startRetrievingNews(userId: string) {
    this.watchlistService.emit('startRetrievingNews', userId);
  }

  stopRetrievingNews(userId: string) {
    this.watchlistService.emit('stopRetrievingNews', userId);
  }
}
