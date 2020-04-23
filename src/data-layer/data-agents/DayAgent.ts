import { Day, Column } from "../models";
import { BaseAgent } from "./BaseAgent";
import { DayOfTheWeek, DbOperations } from "../../_types/enums";
import { Catch } from "../../business-layer/decorators/CatchError";
import { IFindOptions } from "../../_types/interfaces";
import { IDay } from "../../_types/interfaces/IDay";
import { ColumnAgent } from "./ColumnAgent";

export class DayAgent extends BaseAgent {
    constructor() {
        super(Day);
    }

    @Catch()
    async getAllDays(userId: number) {
        const findOptions: IFindOptions = {
            where: { userId }
        }

        return this.getAll(findOptions);
    }

    @Catch()
    public async addDay(dayObj: IDay, column: Column, userId: number) {
        const day: Day = new Day(column, dayObj.name, userId);

        return this.repository.save(day);
    }

    @Catch()
    public async removeDayById(id: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }

    @Catch()
    public async updateDayById(id: number, dayObj: IDay, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: [ 'meals' ]
        };

        return this.update(id, dayObj, findOptions);
    }

    @Catch()
    public async getSingleDayById(id: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: [ 'meals' ]
        }

        return this.getOne(id, findOptions);
    }

    @Catch()
    public async getSingleDayFromColumn(columnId: number, dayId: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { columnId, userId },
            relations: [ 'meals' ]
        }

        return this.getOne(dayId, findOptions);
    }

    @Catch()
    public async updateDay(day: Day, requestBody: IDay) {
        if (requestBody.column) {
            day.column = requestBody.column;
        }
        day.name = requestBody.name;

        return this.repository.save(day);
    }

    @Catch()
    public async removeDay(day: Day) {
        return this.repository.remove(day);
    }

    @Catch()
    public async performOperationOnDay(day: Day, operation: DbOperations) {
        switch (operation) {
            case DbOperations.CREATE || DbOperations.UPDATE:
                return this.repository.save(day);
                break;
            case DbOperations.DELETE:
                return this.repository.remove(day);
                break;
            default:
                return;
                break;
        }
    }

    public async addDayToColumn(column: Column, name: DayOfTheWeek) {
        const day = new Day(column, name, column.userId);
        return this.repository.save(day);
    }
}
