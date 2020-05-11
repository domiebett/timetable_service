import {BaseAgent} from "./BaseAgent";
import { IMeal, IColumn, ICategory, IFindOptions } from "../../_types/interfaces";
import { Category, Meal, Column, Day } from "../models";
import { IDay } from "../../_types/interfaces/IDay";
import { Catch } from "../../business-layer/decorators/CatchError";

export class MealAgent extends BaseAgent {
    constructor() {
        super(Meal);
    }

    @Catch()
    async addMeal(mealObj: IMeal, day: Day, category: Category = null) {
        const meal = new Meal();

        meal.day = day;
        meal.mealId = mealObj.mealId;
        meal.time = mealObj.time;
        meal.userId = mealObj.userId || day.userId;

        if (category) {
            meal.category = category;
        }

        return this.repository.save(meal);
    }

    @Catch()
    async getMeals(userId) {
        const findOptions: IFindOptions = {
            where: { userId }
        };

        return this.getAll(findOptions);
    }

    @Catch()
    async getMealById(id, userId) {
        const findOptions: IFindOptions = {
            where: { userId }
        }

        return this.getOne(id, findOptions);
    }

    @Catch()
    async updateMealById(id, requestBody, userId) {
        const findOptions: IFindOptions = {
            where: { userId },
        };

        return this.update(id, requestBody, findOptions);
    }

    @Catch()
    async removeMealById(id, userId) {
        const findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }

    @Catch()
    async getSingleMealFromDay(dayId: number, mealId: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId, dayId }
        }

        return this.getOne(mealId, findOptions);
    }

    @Catch()
    async deleteMeal(meal: Meal) {
        return this.repository.delete(meal);
    }
}
