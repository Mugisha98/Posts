import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware'
import helmet from 'helmet';

class App {

    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    // 
    private initializeMiddlewares(): void {
        this.express.use(helmet()); // Security headers to prevent attacks
        this.express.use(cors()); // CORS to allow requests from other domains
        this.express.use(morgan('dev')); // Logging requests to the console
        this.express.use(express.json()); // Parse JSON requests to req.body 
        this.express.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests to req.body
        this.express.use(compression()); // Compress responses to client 
    }

    // Handling the controllers  
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }

    // Error handling middleware
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    // Connect to MongoDB database
    private initializeDatabaseConnection(): void {
        const {  MONGO_PATH } = process.env;
        //Connect to MongoDB atlas database
        if (!MONGO_PATH) {
            console.log('Mongo path is not defined');
        }
        mongoose.connect(`${MONGO_PATH}`).then(() => { 
            console.log('Connected to MongoDB');
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
