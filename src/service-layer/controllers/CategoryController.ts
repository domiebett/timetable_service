import {Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put} from "routing-controllers";
import {CategoryAgent} from "../../data-layer/data-agents";
import {IUser} from "../../_types/interfaces/IUser";
import {ICategory} from "../../_types/interfaces";

@JsonController('/categories')
export class CategoryController {
    constructor(private categoryAgent: CategoryAgent) { }

    @Get()
    async getAllCategories(@CurrentUser() currentUser: IUser) {
        return await this.categoryAgent.getCategories(currentUser.id);
    }

    @Get('/:categoryId')
    async getSingleCategory(@CurrentUser() currentUser: IUser, @Param('categoryId') categoryId: number) {
        return await this.categoryAgent.getSingleCategory(categoryId, currentUser.id);
    }

    @Post()
    async addCategory(@CurrentUser() currentUser: IUser, @Body() requestBody: ICategory) {
        requestBody.userId = currentUser.id;
        return await this.categoryAgent.addCategory(requestBody);
    }

    @Put('/:categoryId')
    async updateCategory(@CurrentUser() currentUser: IUser, @Body() requestBody: ICategory, @Param('categoryId') categoryId: number) {
        return await this.categoryAgent.updateCategory(categoryId, requestBody, currentUser.id);
    }

    @Delete('/:categoryId')
    async deleteCategory(@CurrentUser() currentUser: IUser, @Param('categoryId') categoryId: number) {
        return await this.categoryAgent.removeCategory(categoryId, currentUser.id);
    }
}
