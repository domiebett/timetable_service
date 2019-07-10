import * as config from 'config';
import { Express } from './Express';

export class Application {
    private express: Express;
    private port: number = config.get('express.port');

    constructor() {
        this.express = new Express();

        this.setUpApplication();
    }

    private async setUpApplication() {
        await this.serveExpressApp();
    }

    private async serveExpressApp() {
        return await this.express.app.listen(this.port, () => {
            console.log(`App started on port ${this.port}`);
        });
    }
}
