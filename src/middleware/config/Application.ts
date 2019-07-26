import * as config from 'config';
import { Http2Server } from 'http2';
import { Eureka } from 'eureka-js-client';
import { Express } from './Express';
import { EurekaService } from './EurekaService';
import { Tasks } from './../tasks';
import { MongooseAccess } from '../../data-layer/adapters/MongoAccess';
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

    /**
     * Sets up all application requirements
     */
    private async setUpApplication() {
        this.server = await this.serveExpressApp();
        this.eurekaClient = await this.setUpEureka();
        await this.connectToDatabase();
        
        // await Tasks.run();

        await process.on('SIGINT', async () => await this.quitProcesses());
    }

    /**
     * Expose express app via specified port.
     */
    private async serveExpressApp() {
        return await this.express.app.listen(this.port, () => {
            logger.info(`App started on port ${this.port}`);
        });
    }

    /**
     * Setup for eureka service connection
     */
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

    /**
     * Connects to the database.
     */
    private async connectToDatabase() {
        return await MongooseAccess.connect();
    }

    /**
     * Quit all processes started out by the system.
     */
    private async quitProcesses() {
        await this.server.close();
        await this.eurekaClient.stop();
        await Tasks.stopAll();
    }
}
