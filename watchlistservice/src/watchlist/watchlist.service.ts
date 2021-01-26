import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Anime } from './anime.model';
import { Status } from './anime.model';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel('Anime') private readonly animeModel: Model<Anime>,
  ) {}

  async findAll(): Promise<Anime[] | undefined> {
    return await this.animeModel.find({}).exec();
  }

  async findById(id: string): Promise<Anime> {
    return this.animeModel.findById(id);
  }

  async getWatchlistForUser(userId: string) {
    return await this.animeModel.find({ userId: userId }).exec();
  }

  async addToWatchlist(userId: string, anime: JSON) {
    console.log(userId, anime);
    const animeToAdd = new this.animeModel({
      ...anime,
      userStatus: Status.PLANNING,
      userProgress: 0,
      userId: userId,
    });
    const res = await animeToAdd.save();
    return res;
  }

  async updateAnime(
    userId: string,
    animeId: string,
    newAnimeObject: Record<string, any>,
  ): Promise<Anime> {
    console.log('update Anime', userId, animeId);
    const doc = await this.animeModel.findById(animeId);
    doc.userProgress = newAnimeObject.userProgress;
    doc.userStatus = newAnimeObject.userStatus;
    return doc.save();
  }

  async deleteAnime(animeId: string) {
    return this.animeModel.deleteOne({ _id: animeId });
  }
}
