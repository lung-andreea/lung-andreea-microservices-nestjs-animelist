// EXTERNAL SERVICE to get data for populating our app
// Jikan Api documentation: https://jikan.docs.apiary.io/#
// Here we use their Search api + simple get api

import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async getAllAnimeForQuery(query: string): Promise<JSON[]> {
    let result = [];
    await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        result = this.buildSearchResponse(data);
      });
    return result;
  }

  async getAnimeWithId(mal_id: number): Promise<any> {
    let result = {};
    await fetch(`https://api.jikan.moe/v3/anime/${mal_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        result = this.buildGetResponse(data);
      });
    return result;
  }

  buildGetResponse(fullAnime) {
    return {
      mal_id: fullAnime.mal_id,
      title: fullAnime.title,
      synopsis: fullAnime.synopsis,
      image_url: fullAnime.image_url,
      score: fullAnime.score,
      episodes: fullAnime.episodes,
      status: fullAnime.status,
      favorites: fullAnime.favorites,
      myAnimeList_url: fullAnime.url,
      trailer_url: fullAnime.trailer_url,
    };
  }

  buildSearchResponse(searchResult): JSON[] {
    const animeList = searchResult.results;
    return animeList.map((anime) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.image_url,
      score: anime.score,
      episodes: anime.episodes,
    }));
  }
}
