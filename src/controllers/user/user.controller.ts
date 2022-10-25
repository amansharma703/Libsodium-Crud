import { Router, Request, Response, request } from "express";
import catchAsync from '../../utils/asyncWrapper'
import { UserManager } from "./user.manager";

export class UserController {
    public router = Router();
    private _userManager = new UserManager();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/',
            catchAsync(this.createUser.bind(this))
        );
    }

    private createUser = async (request: Request, response: Response) => {

    }
}