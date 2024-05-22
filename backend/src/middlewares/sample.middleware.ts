import { Request, Response, NextFunction } from 'express';

class SampleMiddleware {
    static logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    }
}

export default SampleMiddleware;