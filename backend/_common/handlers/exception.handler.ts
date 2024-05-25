import { ErrorMiddleware } from 'types';
import { ApplicationError } from '../exceptions/_base.exception';
import { NextFunction, Request, Response } from 'express';

const handler = function(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction): ErrorMiddleware {

    if (err instanceof ApplicationError) {
        res
            .status(err.statusCode)
            .json({
                type: err.name,
                error: err.message
            });
    } else {

        res
            .status(500)
            .json({
                type: 'Unhandled Exception',
                error: 'Internal Server Error'
            });
    }
    // weird
    return () => { };
}

export default handler
