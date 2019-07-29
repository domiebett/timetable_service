import axios from 'axios';
import * as config from 'config';
import { BaseService } from './BaseService';

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
    async fetchAll() {
        const response = await axios.get(this.mealsPath);
        return response.data.meals;
    }

    /**
     * Get a single meal
     * @param mealId - the id for a meal
     */
    async fetchOne(mealId) {
        const response = await axios.get(`${this.mealsPath}/${mealId}`);
        return response.data.meal;
    }
}
