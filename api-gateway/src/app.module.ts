import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { db_connection_string } from './util';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(db_connection_string),
    AuthModule,
    UserModule,
    ClientsModule.register([
      {
        name: 'ANIME_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_CONNECTION_URI,
        },
      },
      {
        name: 'WATCHLIST_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_CONNECTION_URI,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
