import { Request, Response, NextFunction } from 'express';

abstract class BaseRestController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const resources = await this.getAllResources();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const resource = await this.getResourceById(id);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const newResource = await this.createResource(data);
            res.status(201).json(newResource);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedResource = await this.updateResource(id, data);
            res.json(updatedResource);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await this.deleteResource(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    // Abstract methods to be implemented by subclasses
    protected abstract getAllResources(): Promise<any[]>;
    protected abstract getResourceById(id: string): Promise<any>;
    protected abstract createResource(data: any): Promise<any>;
    protected abstract updateResource(id: string, data: any): Promise<any>;
    protected abstract deleteResource(id: string): Promise<void>;
}

export default BaseRestController;
