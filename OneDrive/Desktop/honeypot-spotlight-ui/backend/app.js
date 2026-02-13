import express from "express";
import cors from "cors";

import logRoutes from "./routes/logRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // ✅ Inject io BEFORE routes (set via app.set("io", io) after Socket.IO init)
  app.use((req, res, next) => {
    req.io = app.get("io");
    next();
  });

  app.use("/api/logs", logRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  return app;
};

export default createApp;