import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import httpStatus from 'http-status';
import routes from './src/routes.ts';


const app = express();

dotenv.config({ path: '.env' });
import connectToMongo from './db/conn';
import { ErrorHandler } from './src/middlewares/error';
require('./db/conn');

//Connect to database
connectToMongo();
const port = process.env.PORT || 8000;

// middleware to use req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// available routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((_req: Request, _res: Response) => {
    _res.status(httpStatus.NOT_FOUND).json({
        code: 404,
        message: 'Not found',
        stack: 'Error: Not found'
    });
});

const _errorHandler = new ErrorHandler();

// convert error to ApiError, if needed
app.use(_errorHandler.errorConverter);

// handle error
app.use(_errorHandler.errorHandler);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});