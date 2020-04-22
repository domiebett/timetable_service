import { JsonController, CurrentUser, Get, Post, Body, Put, Param, Delete } from "routing-controllers";
import { DayAgent } from "../../data-layer/data-agents/DayAgent";
import { IUser } from "../../_types/interfaces/IUser";
import { IDay } from "../../_types/interfaces/IDay";
import { ColumnAgent } from "../../data-layer/data-agents";
import { Column, Day } from "../../data-layer/models";
import { DbOperations } from "../../_types/enums";

@JsonController('/timetable/days')
export class DayController {
    constructor(private dayAgent: DayAgent, private columnAgent: ColumnAgent) { }

    @Get()
    async getAllDays(@CurrentUser() currentUser: IUser) {
        return this.dayAgent.getAllDays(currentUser.id);
    }

    @Get('/:dayId')
    async getSingleDay(@CurrentUser() currentUser: IUser, @Param('dayId') dayId) {
        return this.dayAgent.getSingleDayById(dayId, currentUser.id);
    }

    @Post()
    async addDay(@CurrentUser() currentUser: IUser, @Body() requestBody: IDay) {
        requestBody.userId = currentUser.id;
        const column = <Column> await this.columnAgent.getSingleColumn(requestBody.column, currentUser.id);
        return this.dayAgent.addDay(requestBody, column, currentUser.id);
    }

    @Put('/:dayId')
    async updateDay(@CurrentUser() currentUser: IUser, @Body() requestBody: IDay, @Param('dayId') dayId: number) {
        return this.dayAgent.updateDayById(dayId, requestBody, currentUser.id);
    }

    @Delete('/:dayId')
    async deleteDay(@CurrentUser() currentUser: IUser, @Param('dayId') dayId: number) {
        return this.dayAgent.removeDayById(dayId, currentUser.id);
    }
}

@JsonController('/columns/:columnId/days')
export class ColumnDaysController {
    constructor(private dayAgent: DayAgent, private columnAgent: ColumnAgent) { }

    @Get()
    async getAllDays(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number) {
        const column = <Column> await this.columnAgent.getSingleColumn(columnId, currentUser.id);

        return column.days;
    }

    @Get('/:dayId')
    async getSingleDay(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number, @Param('dayId') dayId: number) {
        return this.dayAgent.getSingleDayFromColumn(columnId, dayId, currentUser.id);
    }

    @Delete('/:dayId')
    async deleteDay(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number, @Param('dayId') dayId: number) {
        const day = <Day> await this.dayAgent.getSingleDayFromColumn(columnId, dayId, currentUser.id);

        return this.dayAgent.performOperationOnDay(day, DbOperations.DELETE);
    }

    @Put('/:dayId')
    async updateDay(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number, @Param('dayId') dayId: number, @Body() requestBody: IDay) {
        const day = <Day> await this.dayAgent.getSingleDayFromColumn(columnId, dayId, currentUser.id);

        if (requestBody.columnId) {
            const column = <Column> await this.columnAgent.getSingleColumn(columnId, currentUser.id);
            requestBody.column = column;
        }

        return this.dayAgent.updateDay(day, requestBody);
    }

    @Post()
    async addDay(@CurrentUser() currentUser: IUser, @Param('columnId') columnId, @Body() requestBody: IDay) {
        const column = <Column> await this.columnAgent.getSingleColumn(columnId, currentUser.id);

        return this.dayAgent.addDay(requestBody, column, currentUser.id);
    }
}
