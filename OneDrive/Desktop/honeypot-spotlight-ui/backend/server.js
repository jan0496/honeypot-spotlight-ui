import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import createApp from "./app.js";
import connectDB from "./config/db.js";
import initSocket from "./sockets/liveFeed.js";

dotenv.config();
connectDB();

// 1️⃣ Create Express app
const app = createApp();

// 2️⃣ Create HTTP server with Express
const server = http.createServer(app);

// 3️⃣ Attach Socket.IO to the same server
const io = new Server(server, {
  cors: { origin: "*" }
});

// 4️⃣ Inject io into Express (for routes that need it)
app.set("io", io);

// 5️⃣ Initialize socket listeners
initSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});