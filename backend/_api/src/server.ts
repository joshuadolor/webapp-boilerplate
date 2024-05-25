import dotenv from "dotenv";
import 'express-async-errors';
dotenv.config()

import App from '@common/app';
import config from '@config/app';
import routes from './routes';
import middlewares from './middlewares';

const app = new App({
    port: config.port,
    middlewares: middlewares,
    routes: routes,
});

app.listen()
