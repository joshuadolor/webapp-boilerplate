import { ApplicationError } from './_base.exception';

export class NotFoundError extends ApplicationError {
    constructor(message: string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
