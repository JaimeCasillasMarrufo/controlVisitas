import express,{ Application}  from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from 'cors';
import GuardiasController from "./controllers/GuardiasController";

const app:Application=express();
const corsOptions:CorsOptions={
    origin:"http://localhost:8080",
    optionsSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());


GuardiasController.mount(app);

export default app;