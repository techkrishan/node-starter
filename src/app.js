import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { connectToDB } from './configs/dbConfig';

const app = express();

// Use parsing middleware
app.use(json());
app.use(cors());

// Connect to database
connectToDB();

// Routers
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Node Application.');
});

app.get('/about', (req, res) => {
  res.send('This is the about page!');
});

export default app;
