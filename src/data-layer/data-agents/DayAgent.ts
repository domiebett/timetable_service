import { Day, Column } from "../models";
import { BaseAgent } from "./BaseAgent";
import { DayOfTheWeek } from "../../_types/enums";
import { Catch } from "../../business-layer/decorators/CatchError";
import { IFindOptions } from "../../_types/interfaces";

export class DayAgent extends BaseAgent {
    constructor() {
        super(Day);
    }

    @Catch()
    async getDay(id, userId) {
        const findOptions: IFindOptions = {
            where: { userId }
        }

        return this.getOne(id, findOptions);
    }

    public async addDayToColumn(column: Column, name: DayOfTheWeek) {
        const day = new Day(column, name, column.userId);
        return this.repository.save(day);
    }
}
