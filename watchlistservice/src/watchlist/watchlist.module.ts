import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchlistService } from './watchlist.service';
import { WatchlistWsGateway } from './watchlist-ws.gateway';
import { animeSchema } from './anime.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Anime', schema: animeSchema }]),
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService, WatchlistWsGateway],
})
export class WatchlistModule {}
