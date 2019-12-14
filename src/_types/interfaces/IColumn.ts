import {Meal} from "../../data-layer/models";

export interface IColumn {
    id?: number;
    weekNo: number;
    name?: string;
    meals?: Meal[];
    userId: number;
}