import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private intervalId: NodeJS.Timeout | null = null;

    afterInit() {
        console.log('✅ WebSocket Gateway initialized');
        this.startBroadcast();
    }

    handleConnection(client: Socket) {
        console.log(`⚡ Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`❌ Client disconnected: ${client.id}`);
    }

    private startBroadcast() {
        this.intervalId = setInterval(() => {
            const now = new Date();
            const msg = `Hi current time is ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            this.server.emit('time-update', msg);
            console.log('🕒 Sent:', msg);
        }, 10_000);
    }

    public stopBroadcast() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
