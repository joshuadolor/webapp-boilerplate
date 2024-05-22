import dotenv from "dotenv";
dotenv.config()

import App from '@/app';
import controllers from '@/controllers/index.controller';
import middlewares from '@/middlewares/index.middleware';
import bodyParser from 'body-parser';
import { port } from '@/config/app';

const app = new App({
    port,
    controllers: controllers,
    middlewares: [
        ...middlewares,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});

app.listen()