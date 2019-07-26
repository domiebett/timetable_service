import { TimetableModel } from './../models/TimetableModel';
import { MealService } from './../../business-layer/MealService';

export class TimetableAgent {
    constructor() { }

    /**
     * Add an entry into a timetable.
     * @param timetableEntry - entry for the timetable
     */
    async addTimetableEntry(timetableEntry) {
        if (! (await this.mealIdIsValid(timetableEntry.mealId))) {
            throw { message: 'Meal provided doesnt exist.'};
        }
        return await TimetableModel.create(timetableEntry);
    }

    /**
     * Get all entries from the timetable
     */
    async getTimetable() {
        return await TimetableModel.find({});
    }

    /**
     * Get a single entry from the timetable
     * @param entryId - id for a timetable entry
     */
    async getSingleTimetableEntry(entryId) {
        return await TimetableModel.findById(entryId);
    }

    /**
     * Check if meal exists in food service
     * @param mealId - id of the meal to check for validity
     */
    private async mealIdIsValid(mealId) {
        const mealService = new MealService();
        const meal = await mealService.fetchOne(mealId);
        console.log('boom', JSON.stringify(meal));
        return meal.id === mealId;
    }
}
