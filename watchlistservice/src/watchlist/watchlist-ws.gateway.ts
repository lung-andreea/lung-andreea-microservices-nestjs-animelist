import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OPEN } from 'ws';

@WebSocketGateway(8081)
export class WatchlistWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  broadcast(data: any): void {
    this.server.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  alertNews(payload: string): void {
    console.log('EMIT NEWS', payload);
    this.server.emit('newsAlert', {
      payload: payload,
    });
  }

  @SubscribeMessage('getNews')
  onEvent(client: Socket, data: any): WsResponse<unknown> {
    console.log(data);
    const event = 'events';
    return { event, data };
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('New connecting client');
    this.server.emit('connect');
  }

  handleDisconnect(client: any): any {
    console.log('Client Disconnected');
  }
}
