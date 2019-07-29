import axios from 'axios';
import * as config from 'config';
import { BaseService } from './BaseService';
import { IMeal } from '../../data-layer/data-abstracts/interfaces';

export class MealService extends BaseService {
    private zuulServiceUrl: string;
    private mealsPath: string;

    constructor() {
        super();
        this.zuulServiceUrl = `http://${config.get('zuul.host')}:${config.get('zuul.port')}`;
        this.mealsPath = `${this.zuulServiceUrl}/food-service/meals`;
    }

    /**
     * Fetch meals from the food service
     */
    async fetchAll(): Promise<IMeal[]> {
        const response = await axios.get(this.mealsPath);
        return response.data.meals;
    }

    /**
     * Get a single meal
     * @param mealId - the id for a meal
     */
    async fetchOne(mealId): Promise<IMeal> {
        const response = await axios.get(`${this.mealsPath}/${mealId}`);
        return response.data.meal;
    }

    /**
     * Fetch multiples meals with provided ids
     * @param mealIds - ids for meals
     */
    async fetchWithIds(mealIds: any[]): Promise<IMeal[]> {
        if ((mealIds && mealIds.length < 1) || !mealIds) {
            return [];
        }
        const concatMealIds = mealIds.join(',');
        const response = await axios.get(`${this.mealsPath}?mealIds=${concatMealIds}`);
        return response.data.meals;
    }
}
