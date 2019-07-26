import * as Mongoose from 'mongoose';
import * as config from 'config';
import { logger } from '@bit/domiebett.budget_app.logging';

class MongooseAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        MongooseAccess.connect();
    }

    static async connect(): Promise<Mongoose.Connection> {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        let databaseHost = config.get('mongo.host');
        let databasePassword = config.get('mongo.password');
        let databasePort = config.get('mongo.port');
        let databaseName = config.get('db.name');
        let connectionString = `mongodb://${databaseHost}:${databasePort}/${databaseName}`;

        this.mongooseConnection = Mongoose.connection;

        await this.mongooseConnection.once('open', () => {
            logger.info('Connection to mongodb is opened.');
        });

        this.mongooseInstance = await Mongoose.connect(connectionString, { useNewUrlParser: true});

        await this.mongooseConnection.on('connected', () => {
            logger.info('Mongoose default connection open to ' + connectionString);
        });

        // If the connection throws an error
        await this.mongooseConnection.on('error', (msg) => {
            logger.info('Mongoose default connection message:', msg);
        });

        // When the connection is disconnected
        await this.mongooseConnection.on('disconnected', () => {
            setTimeout(function () {
                this.mongooseInstance = Mongoose.connect(connectionString);
            }, 10000);
            logger.info('Mongoose default connection disconnected.');
        });

        // When the connection is reconnected
        await this.mongooseConnection.on('reconnected', () => {
            logger.info('Mongoose default connection is reconnected.');
        });

        // If the Node process ends, close the Mongoose connection
        await process.on('SIGINT', () => {
            this.mongooseConnection.close(() => {
                logger.info('Mongoose default connection disconnected through app termination.');
                process.exit(0);
            });
        });

        return this.mongooseInstance;
    }
}

MongooseAccess.connect();

export { MongooseAccess };
