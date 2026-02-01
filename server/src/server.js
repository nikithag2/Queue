import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

import { initSocket } from "./socket/socketServer.js";
import { setIO } from "./socket/io.js";

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

console.log("✅ Starting server.js...");

// ✅ Init socket
const io = initSocket(httpServer);
console.log("✅ Socket initialized in server.js");

// ✅ Store globally
setIO(io);
console.log("✅ Socket stored globally using setIO()");

connectDB();

httpServer.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
