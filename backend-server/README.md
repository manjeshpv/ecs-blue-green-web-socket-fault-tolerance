# Socket

```js
const { io } = await import("https://cdn.socket.io/4.7.5/socket.io.esm.min.js");

const socket = io("http://localhost:3000", {
    transports: ["websocket"], // only websocket, skip polling
});

socket.on("connect", () => console.log("✅ Connected:", socket.id));
socket.on("disconnect", () => console.log("❌ Disconnected"));
socket.on("connect_error", (err) => console.error("⚠️ Connection error:", err.message));


```