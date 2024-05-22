import { Request, Response, NextFunction } from 'express';

// Define a custom error class with status property
class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorMiddleware {
  static handle404(req: Request, res: Response, next: NextFunction) {
    const err = new HttpError('Not Found', 404);
    next(err);
  }

  static handleError(err: HttpError, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    });
  }
}

export default ErrorMiddleware;
