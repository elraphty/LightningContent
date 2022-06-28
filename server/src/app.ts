import express, {Application, Response, Request, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import http from 'http';
import {responseError} from './utils';
import initiateSocket from './config/socket';
import 'dotenv/config';
import './config/mongodb';

const app: Application = express();
const server: http.Server = http.createServer(app);

// App middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Router files
app.use('/', routes);

initiateSocket(server);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        responseError(res, 500, err.message);
    }
});

export default server;