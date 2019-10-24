import * as config from 'config';
import { Http2Server } from 'http2';
import { Eureka } from 'eureka-js-client';
import { Express } from './Express';
import { EurekaService } from './EurekaService';
import { DbAdapter} from "../../data-layer/adapters/Connection";
import { logger } from '@bit/domiebett.budget_app.logging';
import {Connection} from "typeorm";

export class Application {
    private express: Express;
    private server: Http2Server;
    private eurekaClient: Eureka;
    private port: number = parseInt(process.env.APP_PORT);
    private dbConnection: Connection;

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
        this.dbConnection = await this.connectToDatabase();

        await process.on('SIGINT', async () => await this.quitProcesses());
    }

    /**
     * Expose express app via specified port.
     */
    private async serveExpressApp() {
        return this.express.app.listen(this.port, () => {
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

        return client;
    }

    /**
     * Connects to the database.
     */
    private async connectToDatabase() {
        return await DbAdapter.connect();
    }

    /**
     * Quit all processes started out by the system.
     */
    private async quitProcesses() {
        await this.server.close();
        await this.eurekaClient.stop();
        await this.dbConnection.close();
    }
}
