import express, {Request, Response, NextFunction} from 'express';
import {hello} from '@/shared/sample';

class HomeController {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.home)
    }

    home = (req: Request, res: Response) => {
        res.json({ 
            status: "success", 
            message: hello()
        });
    }
}

export default HomeController;