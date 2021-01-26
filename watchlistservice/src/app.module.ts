import { Module } from '@nestjs/common';
import { WatchlistModule } from './watchlist/watchlist.module';
import { MongooseModule } from '@nestjs/mongoose';
import { db_connection_string } from './util';

@Module({
  imports: [MongooseModule.forRoot(db_connection_string), WatchlistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
