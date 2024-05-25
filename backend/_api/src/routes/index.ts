import { RouteMap, RouteConfig } from '@common/types';
import UserController from '@controllers/user.controller'

const commonRouteMethodMaps: RouteConfig[] = [
    { method: 'get', path: '/', handler: 'getAll', },
    { method: 'get', path: '/:id', handler: 'getById', },
    { method: 'post', path: '/', handler: 'create', },
    { method: 'put', path: '/:id', handler: 'update', },
    { method: 'delete', path: '/:id', handler: 'delete', },
]

const routes: RouteMap = {
    'users': {
        controller: UserController,
        routes: commonRouteMethodMaps,
    },
}

export default routes;
