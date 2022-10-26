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
        this.router.post('/verify',
            catchAsync(this.verifyUser.bind(this))
        );
        this.router.post('/create-signature',
            catchAsync(this.createSignature.bind(this))
        );
    }

    private createUser = async (request: Request, response: Response) => {
        console.log(request.body);
        const { publicKey, privateKey } = await this._userManager.createSigningKey();
        const createdUser = await this._userManager.createUser(request.body, publicKey);

        // response.status(httpStatus.CREATED).send({ createdUser, privateKey });
        response.status(httpStatus.CREATED).render("index", { createdUser, privateKey });
    }

    private createSignature = async (request: Request, response: Response) => {
        const { message, privateKey } = request.body;
        const signature = await this._userManager.createSignature(message, privateKey);
        // response.status(httpStatus.CREATED).send({ signature: signature });
        response.status(httpStatus.CREATED).render("generate-sign", { signature: signature });
    }

    private verifyUser = async (request: Request, response: Response) => {
        /*
            Commented this code for sake of simplity to take signature from input field
            const signature = request.header('x-auth-token');
            if (!signature) {
                return response.status(httpStatus.NOT_FOUND).json({ msg: 'Signature not found' });
            }
        */

        const { userId, message, signature } = request.body
        const verifyUser = await this._userManager.verifyUser(userId, message, signature);
        // response.status(httpStatus.CREATED).send({ verifyUser: verifyUser });
        response.status(httpStatus.CREATED).render("verify", { verifyUser: verifyUser });

    }
}