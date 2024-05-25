import { ApplicationError } from './_base.exception';

class ValidationError extends ApplicationError {
    constructor(message: string,) {
        super(message, 400); // 400 Bad Request
        this.name = 'ValidationError';
    }
}

export default ValidationError;
