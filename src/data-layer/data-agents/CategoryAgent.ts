import * as _ from 'lodash';
import { Category } from '../models';
import {BaseAgent} from "./BaseAgent";
import {ICategory, IFindOptions} from "../../_types/interfaces";

export class CategoryAgent extends BaseAgent {
    constructor() {
        super(Category);
    }

    async addCategory(categoryObj: ICategory) {
        return this.add(Category, categoryObj);
    }

    async getCategories(userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };
        return this.getAll(findOptions);
    }

    async getSingleCategory(id, userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };
        return this.getOne(id, findOptions);
    }

    async updateCategory(id, requestBody, userId) {
        let findOptions: IFindOptions = {
            where: { userId },
            relations: ['meals']
        };

        return this.update(id, requestBody, findOptions);
    }

    async removeCategory(id: number, userId) {
        let findOptions: IFindOptions = {
            where: { userId }
        };

        return this.remove(id, findOptions);
    }
}
