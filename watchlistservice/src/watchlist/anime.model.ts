import * as mongoose from 'mongoose';

export enum Status {
  PLANNING = 'Planning',
  PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export const animeSchema = new mongoose.Schema({
  mal_id: { type: Number, required: true },
  title: { type: String, required: true },
  synopsis: String,
  image_url: { type: String, required: true },
  score: { type: Number, required: true },
  episodes: Number,
  status: String,
  favorites: Number,
  myAnimeList_url: String,
  trailer_url: String,
  userStatus: {
    type: String,
    enum: [Status.PLANNING, Status.PROGRESS, Status.COMPLETED],
    default: Status.PLANNING,
  },
  userProgress: Number,
  userId: { type: String, required: true },
});

export interface Anime extends mongoose.Document {
  id: string;
  mal_id: number;
  title: string;
  synopsis: string;
  image_url: string;
  score: number;
  episodes: number;
  status: string;
  favorites: number;
  myAnimeList_url: string;
  trailer_url: string;
  userStatus: Status;
  userProgress: number;
  userId: string;
}
