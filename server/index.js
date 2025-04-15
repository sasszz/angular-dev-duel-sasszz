import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import expressValidation from "express-validation";
import httpStatus from "http-status";

import APIError from "./lib/APIError.js";
import api from "./routes/index.js";
import config from "./config/index.js";

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app and server
const app = express();
app.server = http.createServer(app);

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes mounted at /api
app.use("/api", api({ config }));

// Serve Angular static files in production
if (config.env === "production") {
  const angularDistPath = path.join(__dirname, "../client/dist/dev-duel");
  app.use(express.static(angularDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(angularDistPath, "index.html"));
  });
}

// Convert non-APIError errors
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedMessage = err.errors
      .map((e) => e.messages.join(". "))
      .join(" and ");
    const error = new APIError(unifiedMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// Catch 404
app.use((req, res, next) => {
  const err = new APIError("API not found", httpStatus.NOT_FOUND);
  return next(err);
});

// Error response
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.isPublic
      ? err.message
      : httpStatus[err.status] || "Internal Server Error",
    stack: config.env === "development" ? err.stack : {},
  });
});

// Start server
const PORT = process.env.PORT || config.port || 3000;
app.server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
