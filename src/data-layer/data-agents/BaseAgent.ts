import * as _ from "lodash";
import {getRepository, Repository} from "typeorm";
import {Model} from "../models";
import {IFindOptions} from "../../_types/interfaces";

export abstract class BaseAgent {
    protected repository: Repository<Model>;

    protected constructor(entity: { new(...args: any[]): Model }) {
        this.repository = getRepository(entity);
    }

    protected async add(Entity: { new(): Model }, requestBody: object) {
        let entity: Model = new Entity();

        return this.save(entity, requestBody);
    }

    protected async getAll(findOptions: IFindOptions) {
        return this.repository.find(findOptions);
    }

    protected async getOne(id, findOptions: IFindOptions) {
        return this.repository.findOneOrFail(id, findOptions);
    }

    protected async update(id: number, requestBody: object, findOptions: IFindOptions = {}) {
        let entity = await this.getOne(id, findOptions);
        
        return this.save(entity, requestBody);
    }

    protected async remove(id: number, findOptions: IFindOptions = {}) {
        let entity = await this.getOne(id, findOptions);
        return this.repository.remove(entity);
    }

    private async save(entity, requestBody) {
        // only assign values from the model
        await _.assign(entity, _.pick(requestBody, _.keys(entity)));

        return this.repository.save(entity);
    }
}
