import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { connectToDB } from './configs/dbConfig';
import router from './routes';

const app = express();

// Use parsing middleware
app.use(json());
app.use(cors());

// Connect to database
connectToDB();

// Routers
app.use('/api', router);

export default app;
