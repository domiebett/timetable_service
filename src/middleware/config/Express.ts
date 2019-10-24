import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as health from 'express-ping';
import * as jwt from '@bit/domiebett.budget_app.jwt-authenticate';
import {Action, useExpressServer} from 'routing-controllers';

export class Express {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(health.ping());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.setUpControllers();
    }

    /**
     * Sets up routing-controllers
     */
    setUpControllers() {
        const controllersPath = path.resolve('build', 'service-layer/controllers')
        useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true,
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
}
