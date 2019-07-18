import * as config from 'config';
import { Http2Server } from 'http2';
import { Eureka } from 'eureka-js-client';
import { Express } from './Express';
import { EurekaService } from './EurekaService';
import { logger } from '@bit/domiebett.budget_app.logging';

export class Application {
    private express: Express;
    private server: Http2Server;
    private eurekaClient: Eureka;
    private port: number = config.get('express.port');

    constructor() {
        this.express = new Express();

        this.setUpApplication();
    }

    private async setUpApplication() {
        this.server = await this.serveExpressApp();
        this.eurekaClient = await this.setUpEureka();
    }

    private async serveExpressApp() {
        return await this.express.app.listen(this.port, () => {
            logger.info(`App started on port ${this.port}`);
        });
    }

    private async setUpEureka() {
        const client = EurekaService.getClient();
        await logger.info('Connecting to eureka...');

        await client.start((error: Error) => {
            if (error) {
                if (!error.message) error.message = 'Error connecting to eureka server!!!';
                logger.error('Eureka Connection Error: ', error.message);
                throw error;
            }
        });

        return await client;
    }
}
