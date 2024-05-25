import { Request, Response, NextFunction } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export interface RouteConfig {
    method: HttpMethod;
    path: string;
    handler: string;
    middlewares?: Middleware[];
}

export interface RouteMap {
    [resourceName: string]: {
        controller: any;
        routes: RouteConfig[];
        middlewares?: Middleware[]
    }
}
