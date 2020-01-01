import { JsonController, CurrentUser, Get, Body, Post, Param, Put, Delete } from "routing-controllers";
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

    @Get('/:columnId')
    async getSingleColumn(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number) {
        return await this.columnAgent.getSingleColumn(columnId, currentUser.id);
    }

    @Put('/:columnId')
    async updateColumn(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number, @Body() requestBody: IColumn) {
        return await this.columnAgent.updateColumn(columnId, requestBody, currentUser.id);
    }

    @Delete('/:columnId')
    async deleteColumn(@CurrentUser() currentUser: IUser, @Param('columnId') columnId: number) {
        return await this.columnAgent.removeColumn(columnId, currentUser.id);
    }
}
