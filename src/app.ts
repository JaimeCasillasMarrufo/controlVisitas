import express,{ Application}  from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from 'cors';

const app:Application=express();
const corsOptions:CorsOptions={
    origin:"http://localhost:3000",
    optionsSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

export default app;