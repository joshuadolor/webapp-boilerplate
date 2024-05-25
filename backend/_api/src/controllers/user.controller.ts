import BaseController from '@common/controllers/base-rest.controller';
import ValidationError from '@common/exceptions/validation.exception'

class UserController extends BaseController {
    protected async getAllResources(): Promise<any[]> {
        return [{ id: 1, name: 'John Doe' }];
    }

    protected async getResourceById(id: string): Promise<any> {
        if (id === '2') throw new ValidationError('test');
        return { id, name: 'John Doe' };
    }

    protected async createResource(data: any): Promise<any> {
        return { id: 2, ...data };
    }

    protected async updateResource(id: string, data: any): Promise<any> {
        return { id, ...data };
    }

    protected async deleteResource(id: string): Promise<void> { }
}

export default UserController;
