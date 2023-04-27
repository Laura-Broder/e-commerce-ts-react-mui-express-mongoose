import cors from "cors";
import express from "express";
// import helmet from "helmet";
import morgan from "morgan";
import config from "./config";

import rootRouter from "./routes/rootRoutes";
import { routeNotFound, errorHandler } from "./middleware/errorHandler";
import userRouter from "./routes/userRoutes";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // @ts-ignore
    origin: config.clientOrigins[config.nodeEnv],
  })
);
// app.use(helmet());
app.use(morgan("tiny"));

// Apply routes before error handling
app.use("/", rootRouter);
app.use("/user", userRouter);

// Apply error handling last
app.use(routeNotFound);
app.use(errorHandler);

export default app;
