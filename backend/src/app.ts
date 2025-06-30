import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import bodyParser from "body-parser";
const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))
app.use(bodyParser.json());

import userRoutes from "./routes/user.routes";

app.use("/v1/api/user", userRoutes);

export {app};