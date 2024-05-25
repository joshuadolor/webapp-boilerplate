import { ApplicationError } from './_base.exception';

export class BadDataError extends ApplicationError {
    constructor(message: string) {
        super(message, 422); // 422 Unprocessable Entity
        this.name = 'BadDataError';
    }
}
