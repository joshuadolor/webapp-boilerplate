import express, { Express } from "express";
import { Server } from "http";
import registerRoutes from './register-routes';
import defaultErrorHandler from './handlers/exception.handler'
import { RouteMap, ErrorMiddleware } from './types'

interface AppConfig {
    port: number;
    middlewares: any[];
    routes: RouteMap;
    errorHandler?: ErrorMiddleware
}

class App {
    public app: Express;
    public port: number;
    public routes: RouteMap;
    public server: Server | any;

    constructor({ port, middlewares, routes, errorHandler = defaultErrorHandler }: AppConfig) {
        this.app = express();
        this.port = port;
        this.routes = routes;
        this.server = null;

        this.setMiddlewares(middlewares)
        this.setRoutes()
        this.setErrorHandler(errorHandler)
    }

    private setRoutes() {
        registerRoutes(this.app, this.routes);
    }

    private setMiddlewares(middlewares: any[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
    }

    private setErrorHandler(handler: ErrorMiddleware) {
        this.app.use(handler)
    }

    public listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at http://localhost:${this.port}`);
        })
    }

    public close() {
        this.server.close();
    }
}

export default App;
