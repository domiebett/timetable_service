import { TimetableModel } from './../models/TimetableModel';
import { MealService } from '../../business-layer/services/MealService';
import { ITimetableDocument } from '../data-abstracts/interfaces';

export class TimetableAgent {
    private mealService: MealService;

    constructor() {
        this.mealService = new MealService();
    }

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
    async getTimetableEntries() {
        return await TimetableModel.find({});
    }

    /**
     * Get a single entry from the timetable
     * @param entryId - id for a timetable entry
     */
    async getSingleTimetableEntry(entryId) {
        const entry: ITimetableDocument = await TimetableModel.findOne({ _id: entryId }).lean();
        entry.meal = await (new MealService()).fetchOne(entry.mealId)
        return entry;
    }

    /**
     * Check if meal exists in food service
     * @param mealId - id of the meal to check for validity
     */
    private async mealIdIsValid(mealId) {
        const meal = await this.mealService.fetchOne(mealId);
        return meal.id === mealId;
    }
}
