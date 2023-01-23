import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/user/user.validation";
import UserService from "@/resources/user/user.service";
import auth from "@/middleware/auth.middleware";

class UserController implements Controller {
    public path = "/users"; // path for this controller
    public router = Router(); //Subrouter for this controller
    private UserService = new UserService(); // initialize the user service 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
       //register 
         this.router.post(
                `${this.path}/register`,
                validationMiddleware(validate.register),
                this.register
                );
        //login
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
            );

        this.router.get(`${this.path}`, auth, this.getUser);    
    }

    //Register a new user
    private register = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<Response | void> => {
        try {
            const { nameFirst, nameLast, email, password, role="user" } = request.body;
            const user = await this.UserService.register( 
                nameFirst, 
                nameLast, 
                email, 
                password,
                role
                );
            response.status(201).json({ user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    //Login a user
    private login = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<Response | void> => {
        try {
            const { email, password } = request.body;
            const token = await this.UserService.login( 
                email, 
                password
                );
            response.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    //Get user
    private getUser = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<Response | void> => {
        if(!request.user) {
            next(new HttpException(400, 'User not found'));
        }
        response.status(200).json({ user: request.user });
    }

}

export default UserController;