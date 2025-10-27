import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppGateway } from './socket.gateway';
import {PORT} from "./config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const gateway = app.get(AppGateway);
    const gracefulShutdown = async (signal: string) => {
        console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
        gateway.stopBroadcast();
        await app.close();
        process.exit(0);
    };

    await app.listen(PORT);
    console.log(`Server started on port http://localhost:${PORT}`);
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}
bootstrap();
