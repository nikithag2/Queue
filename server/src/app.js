import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS FIX (allow frontend)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// ✅ Test route
app.get("/", (req, res) => res.send("✅ QUEUE API Running..."));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
