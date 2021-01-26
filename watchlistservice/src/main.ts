import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_CONNECTION_URI,
    },
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.listen(() => logger.log('Watchlist service is listening'));
}
bootstrap();
