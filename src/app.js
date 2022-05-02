import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { connectToDB } from './configs/dbConfig';
import router from './routes';
import logger from './configs/logger';

const app = express();

// Use parsing middleware
app.use(json());
app.use(cors());

// Connect to database
connectToDB();

// Routers
app.use('/api', router);

process.on('uncaughtException', (err) => {
    logger.error(`There was an uncaught error: => ${err}`);
});

process.on('unhandledRejection', (reason, p) => {
    logger.info(`Unhandled Rejection at: ${p}, reason:, ${reason}`);
});

export default app;
