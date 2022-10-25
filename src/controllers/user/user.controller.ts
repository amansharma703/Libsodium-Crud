import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { UserManager } from './user.manager';
import catchAsync from "../../utils/asyncWrapper";
import { UserValidation } from './user.validation';


export class UserController {
    public router = Router();
    private _userManager = new UserManager();
    private _userValidation = new UserValidation();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/',
            catchAsync(this._userValidation.createUser),
            catchAsync(this.createUser.bind(this))
        );
    }

    private createUser = async (request: Request, response: Response) => {
        const user = await this._userManager.createUser(request.body);
        response.status(httpStatus.CREATED).send(user);
    }
}