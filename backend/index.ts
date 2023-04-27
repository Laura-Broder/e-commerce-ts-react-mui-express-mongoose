import mongoose from "mongoose";
import app from "./src/app";
import config from "./src/config";

const server = app.listen(config.port, async () => {
  console.log(`🚀 ${config.name} ${config.version} 🚀`);

  await mongoose
    .connect(config.mongoUri)
    .then(() => {
      console.log("db connected successfully on port " + config.port);
    })
    .catch((err) => {
      console.log("db failed to connect: ", err);
      throw err;
    });
  console.log(
    `🚀 Listening on http://localhost:${config.port} with NODE_ENV=${config.nodeEnv} 🚀`
  );
});

function gracefulShutdown() {
  console.log("Shutting down");
  server.close(() => {
    console.log("HTTP server closed.");

    // When server has stopped accepting connections
    // exit the process with exit status 0
    process.exit(0);
  });
}

process.on("SIGTERM", gracefulShutdown);
