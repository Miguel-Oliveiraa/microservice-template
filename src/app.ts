import express from 'express';
import cors from 'cors';
import router from './controllers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

export default app;
