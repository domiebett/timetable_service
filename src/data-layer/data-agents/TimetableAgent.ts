import { TimetableModel } from './../models/TimetableModel';
import { MealService } from '../../business-layer/services/MealService';
import { ITimetableDocument, IMeal } from '../data-abstracts/interfaces';

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

        if (await this.timetableEntryisDuplicate(timetableEntry)) {
            throw { message: 'Entry is a duplicate, ensure week and day are unique'};
        }
        return await TimetableModel.create(timetableEntry);
    }

    /**
     * Get all entries from the timetable
     */
    async getTimetableEntries(): Promise<ITimetableDocument[]> {
        const entries: ITimetableDocument[] =  await TimetableModel.find({}).lean();
        return await this.mergeWithMeals(entries);
    }

    /**
     * Get a single entry from the timetable
     * @param entryId - id for a timetable entry
     */
    async getSingleTimetableEntry(entryId): Promise<ITimetableDocument> {
        const entry: ITimetableDocument = await TimetableModel.findOne({ _id: entryId }).lean();
        entry.meal = await (new MealService()).fetchOne(entry.mealId)
        return entry;
    }

    /**
     * Check if meal exists in food service
     * @param mealId - id of the meal to check for validity
     */
    private async mealIdIsValid(mealId): Promise<boolean> {
        const meal = await this.mealService.fetchOne(mealId);
        return meal.id === mealId;
    }

    /**
     * Merge meal entry query result with meals from meal service
     * @param entries - timetable entries
     */
    private async mergeWithMeals(entries: ITimetableDocument[]): Promise<ITimetableDocument[]> {
        let mealIdEntries = {};
        await entries.forEach((entry) => {
            mealIdEntries[`${entry.mealId}`] = entry;
        });

        const meals: IMeal[] = await this.mealService.fetchWithIds(Object.keys(mealIdEntries));

        return await entries.map((entry) => {
            for (let meal of meals) {
                if (meal.id === entry.mealId) {
                    entry.meal = meal;
                    return entry;
                }
            }
        });
    }
    
    /**
     * Check if an entry is a duplicate
     * @param entry - entry submitted for saving
     */
    private async timetableEntryisDuplicate(entry: ITimetableDocument): Promise<boolean> {
        const entryCount = await TimetableModel.find({ week: entry.week, day: entry.day }).count();
        return entryCount > 0;
    }
}
