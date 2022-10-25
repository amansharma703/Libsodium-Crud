import { UserController } from '../controllers/user/user.controller';
import { Router } from 'express';

const router = Router();

const routes = [
    {
        path: '/user',
        route: new UserController().router
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
