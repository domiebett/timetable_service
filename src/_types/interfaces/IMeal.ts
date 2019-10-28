import {DayOfTheWeek} from "../enums";
import {Category, Column} from "../../data-layer/models";

export interface IMeal {
    id?: number;
    mealId: number;
    day: DayOfTheWeek;
    columns?: Column[];
    category: Category;
    time?: string;
    userId: number;
}
