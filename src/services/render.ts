import { Request, Response } from "express";


export const homeRoutes = (request: Request, response: Response) => {
    response.render("index", { createdUser: {}, privateKey: "" });
};

export const verifyRoutes = (request: Request, response: Response) => {
    response.render("verify", { verifyUser: "" });
};

export const genSignRoutes = (request: Request, response: Response) => {
    response.render("generate-sign", { signature: "" });
};
