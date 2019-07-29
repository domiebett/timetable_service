import * as cron from 'node-cron';
import { logger } from '@bit/domiebett.budget_app.logging';
import { MealService } from '../../business-layer/services/MealService';

export class Tasks {
    private static tasks: cron.ScheduledTask[] = [];

    constructor() { }

    /**
     * Run tasks
     */
    static run() {
        logger.info('Scheduling tasks.');
        Tasks.tasks.push(Tasks.periodicMealUpdate());
    }

    static periodicMealUpdate() {
        const mealService = new MealService();
        return cron.schedule('* * * * *', async () => {
            await logger.info(await mealService.fetchAll());
        });
    }

    /**
     * Stop all tasks.
     */
    static async stopAll() {
        return await Tasks.tasks.forEach(async (task) => {
            await task.stop();
        });
    }
}
