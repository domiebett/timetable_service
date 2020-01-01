import {DayOfTheWeek} from "../enums";
import {Category, Column, Day} from "../../data-layer/models";

export interface IMeal {
    id?: number;
    mealId: number;
    day?: Day;
    category?: Category;
    time?: string;
    userId: number;
}
