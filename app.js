import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import overCompleteRouter from './routes/overCompleteRoute.js';
import descriptionRoute from './routes/descriptionRoute.js';
import userRoute from './routes/userRoute.js';
import loginlogoutRoute from './routes/loginlogoutRoute.js';
import dotenv from "dotenv";
import outRoute from './routes/outRoute.js';
import players from './routes/players.js';

dotenv.config({
    path:'../.env'
}); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/api/v1', descriptionRoute);
app.use('/api/v1', overCompleteRouter);
app.use('/api/v1', userRoute);
app.use('/api/v1', loginlogoutRoute);
app.use('/api/v1', players);
app.use('/api/v1', outRoute);

// Root route
app.get('/', (req, res) => {
    res.send("WELCOME TO CRICKET_MANAGMENT");
});

export { app };
