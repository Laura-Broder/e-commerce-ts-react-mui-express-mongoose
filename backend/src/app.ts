import cors from 'cors';
import express from 'express';
// import helmet from "helmet";
import morgan from 'morgan';
import config from './config';
import { errorHandler, routeNotFound } from './middleware/errorHandler';
import cartRouter from './routes/cartRouter';
import productsRouter from './routes/productsRouter';
import rootRouter from './routes/rootRoutes';
import userRouter from './routes/userRoutes';
import wishlistRouter from './routes/wishlistRouter';

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
app.use(morgan(config.nodeEnv === "development" ? "dev" : "tiny"));

// Apply routes before error handling
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

// Apply error handling last
app.use(routeNotFound);
app.use(errorHandler);

export default app;
