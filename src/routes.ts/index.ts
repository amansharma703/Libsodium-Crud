import { UserController } from '../controllers/user/user.controller';
import { homeRoutes, verifyRoutes, genSignRoutes } from '../services/render'
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

// For EJS page rendering
router.get("/", homeRoutes);
router.get("/verify", verifyRoutes);
router.get("/generate-sign", genSignRoutes);

export default router;
