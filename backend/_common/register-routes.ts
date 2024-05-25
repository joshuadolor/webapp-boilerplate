import { Application, Router, Request, Response, NextFunction } from 'express';
import { RouteMap } from './types'

function registerRoutes(app: Application, routeConfigs: RouteMap) {
    Object.keys(routeConfigs).forEach(resourceName => {

        const routeConfig = routeConfigs[resourceName]
        const { routes, controller } = routeConfig;
        const resourceMiddlewares = routeConfig.middlewares || [];

        const router = Router();
        const controllerInstance = new controller();

        routes.forEach(({ method, handler, middlewares = [], path }) => {
            const routeMethods = [
                ...resourceMiddlewares,
                ...middlewares,
                (req: Request, res: Response, next: NextFunction) => controllerInstance[handler](req, res, next)];

            router[method](path, routeMethods)
        })

        app.use(`/${resourceName.toLowerCase()}`, router);
    });
}

export default registerRoutes;
