import express, { Express, Request, Response } from "express";
import { Server } from "http";

interface appInit {
    port: number; 
    middlewares: any[]; 
    controllers: any[]
}

class App {
    public app: Express;
    public port: number;
    public server: Server | any;

    constructor({port, controllers, middlewares}: appInit) {
        this.app = express();
        this.port = port;
        this.server = null;

        this.setMiddlewares(middlewares)
        this.setRoutes(controllers)
    }

    private setRoutes(controllers: any[]) {
        controllers.forEach(controller => {
            console.log(controller.path)
            this.app.use('/v1'+controller.path, controller.router)
        })
    }

    private setMiddlewares(middlewares: any[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
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