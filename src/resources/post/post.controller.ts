import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";


class PostController implements Controller {
    public path = "/posts"; // path for this controller
    public router = Router(); //Subrouter for this controller
    private PostService = new PostService(); // initialize the post service 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        //Get all posts
        this.router.get(
            `${this.path}`,
            this.getAll);

        //get one post by id
        this.router.get(
            `${this.path}/:postId`,
            this.getOne)
       
        //Create a new post
        this.router.post(
            `${this.path}`, 
            validationMiddleware(validate.create), 
            this.create);

        //Update a post
        this.router.put(
            `${this.path}/:postId`,
            validationMiddleware(validate.update),
            this.update);
            
        //Delete a post
        this.router.delete(
            `${this.path}/:postId`,
            this.delete);    
    }

    //Get all posts
    private getAll = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<void> => {
        try {
            const posts = await this.PostService.getAll();
            response.status(200).json({ posts });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
    //Get one post
    private getOne = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<void> => {
        try {
            const _id  = request.params.postId;
            const post = await this.PostService.getOne(_id);
            response.status(200).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
    //Create a new post
    private create = async (
        request: Request, 
        response: Response, 
        next: NextFunction
        ): Promise<void> => {
        try {
            const { title, body } = request.body;
            const post = await this.PostService.create( title, body );
            response.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    //Update a post
    private update = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<void> => {
        try {
            const  _id  = request.params.postId;
            const { title, body } = request.body;
            const post = await this.PostService.update(_id, title, body);
            response.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private delete = async (
        request: Request,
        response: Response,
        next: NextFunction
        ): Promise<void> => {
        try {
            const _id = request.params.postId;
            const post = await this.PostService.delete(_id);
            response.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PostController;