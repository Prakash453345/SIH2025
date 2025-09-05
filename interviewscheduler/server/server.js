import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/register.js';

const port=process.env.PORT || 5000;


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/interviewscheduler');

app.use(router);

app.listen(port,()=>console.log(`Server is running live at http://localhost:${port}`));
