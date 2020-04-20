import { Day, Column } from "../models";
import { BaseAgent } from "./BaseAgent";
import { DayOfTheWeek } from "../../_types/enums";
import { Catch } from "../../business-layer/decorators/CatchError";
import { IFindOptions } from "../../_types/interfaces";
import { IDay } from "../../_types/interfaces/IDay";

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
    public async removeDay(id: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }

    @Catch()
    public async updateDay(id: number, dayObj: IDay, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: [ 'meals' ]
        };

        return this.update(id, dayObj, findOptions);
    }

    @Catch()
    public async getSingleDay(id: number, userId: number) {
        const findOptions: IFindOptions = {
            where: { userId },
            relations: [ 'meals' ]
        }

        return this.getOne(id, findOptions);
    }

    public async addDayToColumn(column: Column, name: DayOfTheWeek) {
        const day = new Day(column, name, column.userId);
        return this.repository.save(day);
    }
}
