import { Column } from "../models";
import {BaseAgent} from "./BaseAgent";
import { IColumn, IFindOptions } from "../../_types/interfaces";
import { DayOfTheWeek } from "../../_types/enums";
import { Day } from "../models/Day";
import { DayAgent } from "./DayAgent";
import { Catch } from "../../business-layer/decorators/CatchError";

export class ColumnAgent extends BaseAgent {
    constructor() {
        super(Column);
    }

    @Catch()
    async addColumn(columnObj: IColumn) {
        const column = new Column();

        column.weekNo = columnObj.weekNo;
        column.name = columnObj.name;
        column.userId = columnObj.userId;

        // save column and automatically add all days of the week to it.
        await this.repository.save(column);
        await this.fillDaysInColumn(column);

        return column;
    }

    @Catch()
    async getColumns(userId) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: ['days']
        }
        return this.getAll(findOptions);
    }

    @Catch()
    async getSingleColumn(id, userId) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: ['days']
        };

        return this.getOne(id, findOptions);
    }

    @Catch()
    async updateColumn(id, requestBody, userId) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };

        return this.update(id, requestBody, findOptions);
    }

    @Catch()
    async removeColumn(id, userId) {
        const findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }

    private async fillDaysInColumn(column: Column) {
        for (let item in DayOfTheWeek) {
            const nameOfDay = DayOfTheWeek[item];
            await new DayAgent().addDayToColumn(column, nameOfDay);
        }
    }
}
