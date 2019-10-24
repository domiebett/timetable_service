import { createConnection, Connection } from 'typeorm';
import * as path from 'path';

export class DbAdapter {
    constructor() {
        DbAdapter.connect();
    }

    static async connect() {
        return await createConnection({
            database: process.env.DATABASE_NAME,
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            synchronize: true,
            logging: false,
            entities: [
                path.resolve('src', 'data-layer/models/**/*.ts'),
                path.resolve('build', 'data-layer/models/**/*.js')
            ]
        });
    }
}
