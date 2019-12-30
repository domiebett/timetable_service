import { Column } from "../models";
import {BaseAgent} from "./BaseAgent";
import { IColumn } from "../../_types/interfaces";

export class ColumnAgent extends BaseAgent {
    constructor() {
        super(Column);
    }

    async addColumn(columnObj: IColumn) {
        const column = new Column();

        column.weekNo = columnObj.weekNo;
        column.name = columnObj.name;
        column.userId = columnObj.userId;

        return this.repository.save(column);
    }
}
