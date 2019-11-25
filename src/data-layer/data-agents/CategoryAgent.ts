import * as _ from 'lodash';
import { Category } from '../models';
import {BaseAgent} from "./BaseAgent";
import {ICategory, IFindOptions} from "../../_types/interfaces";
import { Catch } from '../../business-layer/decorators/CatchError';

export class CategoryAgent extends BaseAgent {
    constructor() {
        super(Category);
    }

    @Catch()
    async addCategory(categoryObj: ICategory) {
        return this.add(Category, categoryObj);
    }

    @Catch()
    async getCategories(userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };
        return this.getAll(findOptions);
    }

    @Catch()
    async getSingleCategory(id, userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };
        return this.getOne(id, findOptions);
    }

    @Catch()
    async updateCategory(id, requestBody, userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };

        return this.update(id, requestBody, findOptions);
    }

    @Catch()
    async removeCategory(id: number, userId) {
        let findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }
}
