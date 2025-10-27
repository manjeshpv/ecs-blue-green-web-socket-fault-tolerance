import { Injectable } from '@nestjs/common';
import { PORT } from './config';

@Injectable()
export class AppService {
    getHello(): string {
        return `
<!DOCTYPE html>
<html>
  <body>
    <h3>Right click and Inspect → Console tab</h3>
    
    <pre>
        <code>
            npm start;
            # Ctrl + C to stop nestjs socket server
            # Again start using
            npm start
        </code>
    </pre>
  </body>

  <script type="module">
    import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

    const socket = io("http://localhost:${PORT}", {
      transports: ["websocket"], // only websocket, skip polling
    });

    socket.on("connect", () => console.log("✅ Connected:", socket.id));
    socket.on("disconnect", () => console.log("❌ Disconnected"));
    socket.on("connect_error", (err) =>
      console.error("⚠️ Connection error:", err.message)
    );

    // Listen for server messages
    socket.on("message", (msg) => console.log("💬 Message:", msg));

    // You can also listen to 'time-update' events if your server emits them
    socket.on("time-update", (msg) => console.log("🕒", msg));
  </script>
</html>
`;
    }
}
