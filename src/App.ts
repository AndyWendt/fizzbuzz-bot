import * as express from 'express';
import {NextFunction, Request as Req, Response} from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import EventsController from "./Controllers/EventsController";
import Middleware from "./Middleware";
import SlashController from "./Controllers/SlashController";
import InteractivesController from "./Controllers/InteractivesController";

export interface Request extends Req {
    webtaskContext: WebtaskContext
}

export interface WebtaskContext {
    secrets: {
        SLACK_VERIFICATION_TOKEN: string
        SLACK_BOT_TOKEN: string
        SLACK_OAUTH_TOKEN: string
    }
}

class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));

        // catch 404 and forward to error handler


        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            // error handlers

            // development error handler
            // will print stacktrace
            if (this.express.get('env') === 'development') {
                console.log(req.baseUrl);
                res.status(err.status || 500);
                return res.json({
                    type: 'Error',
                    message: err.message,
                    error: err
                });
            }

            // production error handler
            res.status(err.status || 500);
            res.json({
                type: 'Error',
                message: err.message,
                error: {}
            });
        });

    }

    // Configure API endpoints.
    private routes(): void {

        let router = express.Router();
        this.express.use('/', router);

        router.post('/events', Middleware.checkBodyToken, Middleware.urlVerification, EventsController.events);
        router.post('/slash', Middleware.checkBodyToken, SlashController.slash);
        router.post('/interactive', Middleware.decodePayload, Middleware.checkBodyToken, InteractivesController.interaction);

        this.express.use((req, res, next) => {
            console.log(req.baseUrl);
            let err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }

}

export default new App().express;
