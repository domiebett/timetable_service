import { JsonController, CurrentUser, Get, Body, Post } from "routing-controllers";
import { ColumnAgent } from "../../data-layer/data-agents";
import { IUser } from "../../_types/interfaces/IUser";
import { IColumn } from "../../_types/interfaces";

@JsonController('/timetable/columns')
export class ColumnController {
    constructor(private columnAgent: ColumnAgent) { }

    @Get()
    async getAllColumns(@CurrentUser() currentUser: IUser) {
        return this.columnAgent.getColumns(currentUser.id);
    }

    @Post()
    async addColumn(@CurrentUser() currentUser: IUser, @Body() requestBody: IColumn) {
        requestBody.userId = currentUser.id;
        return await this.columnAgent.addColumn(requestBody);
    }
}
