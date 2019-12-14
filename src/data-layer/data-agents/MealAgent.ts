import {BaseAgent} from "./BaseAgent";
import { IMeal, IColumn, ICategory } from "../../_types/interfaces";
import { Category, Meal, Column } from "../models";

export class MealAgent extends BaseAgent {
    constructor() {
        super(Meal);
    }

    async addMeal(mealObj: IMeal, column: Column, category: Category, userId: number) {
        const meal = new Meal();

        meal.day = mealObj.day;
        meal.time = mealObj.time;
        meal.userId = userId;
        meal.category = category;
        meal.mealId = mealObj.mealId;

        return this.repository.save(meal);
    }

    async getMeal() {

    }

    async getMeals() {

    }

    async updateMeal() {

    }

    async deleteMeal() {

    }
}
