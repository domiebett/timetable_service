import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as health from 'express-ping';
import * as jwt from '@bit/domiebett.budget_app.jwt-authenticate';
import {Action, useExpressServer, useContainer as routeUseContainer } from 'routing-controllers';
import { Container } from 'typedi';

export class Express {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(health.ping());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.setUpExpressServer();
        this.app.use(this.errorHandler());
    }

    /**
     * Sets up routing-controllers
     */
    setUpExpressServer() {
        routeUseContainer(Container);

        const controllersPath = path.resolve('build', 'service-layer/controllers');
        const interceptorsPath = path.resolve('build', 'middleware/interceptors');
        const middlewaresPath = path.resolve('build', 'middleware/express-middlewares');

        return useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            interceptors: [interceptorsPath + '/*.js'],
            middlewares: [middlewaresPath + '/*.js'],
            cors: true,
            defaultErrorHandler: false,
            authorizationChecker: async (action: Action) => {
                const token = await jwt.getToken(action.request);
                return jwt.isValidToken(token);
            },
            currentUserChecker: async (action: Action) => {
                const token = await jwt.getToken(action.request);
                return jwt.getCurrentUser(token);
            }
        });
    }

    /**
     * Handles generic express http errors e.g 404
     * Check src/middleware/express-middlewares/ErrorHandler.ts for
     * for more robust error handling.
     */
    errorHandler() {
        return (req, res, next) => {
            if (!res.headersSent) {
                return res.status(404).send({
                    message: `${req.method} for route: "${req.url}" not found.`,
                    status: 404,
                    name: 'URLNotFound',
                    error: true
                });
            }

            next();
        };
    }
}
