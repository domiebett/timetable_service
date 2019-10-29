import { createConnection, Connection } from 'typeorm';
import * as path from 'path';

export class DbAdapter {
    constructor() {
        DbAdapter.connect();
    }

    static async connect() {
        return await createConnection();
    }
}
