import { JsonController, CurrentUser, Get, Post, Body, Param, Put, Delete } from "routing-controllers";
import { MealAgent, CategoryAgent } from "../../data-layer/data-agents";
import { IUser } from "../../_types/interfaces/IUser";
import { IMeal } from "../../_types/interfaces";
import { DayAgent } from "../../data-layer/data-agents/DayAgent";
import { Day, Category } from "../../data-layer/models";

@JsonController('/timetable/meals')
export class MealController {
    constructor(private mealAgent: MealAgent, private dayAgent: DayAgent, private categoryAgent: CategoryAgent) { }

    @Get()
    async getAllMeals(@CurrentUser() currentUser: IUser) {
        return await this.mealAgent.getMeals(currentUser.id);
    }

    @Post()
    async addMeal(@CurrentUser() currentUser: IUser, @Body() requestBody: IMeal) {
        const day = <Day> await this.dayAgent.getSingleDayById(requestBody.dayId, currentUser.id);
        let category = null;
        if (requestBody.categoryId) {
            category = <Category> await this.categoryAgent.getSingleCategory(requestBody.categoryId, currentUser.id);
        }
        requestBody.userId = currentUser.id;

        return await this.mealAgent.addMeal(requestBody, day, category);
    }

    @Get('/:mealId')
    async getSingleMeal(@CurrentUser() currentUser: IUser, @Param('mealId') mealId: number) {
        return await this.mealAgent.getMeal(mealId, currentUser.id);
    }

    @Put('/:mealId')
    async updateMeal(@CurrentUser() currentUser: IUser, @Param('mealId') mealId: number, @Body() requestBody: IMeal) {
        return await this.mealAgent.updateMeal(mealId, requestBody, currentUser.id);
    }

    @Delete('/:mealId')
    async deleteMeal(@CurrentUser() currentUser: IUser, @Param('mealId') mealId: number) {
        return await this.mealAgent.removeMeal(mealId, currentUser.id);
    }
}
