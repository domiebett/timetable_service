import { DayOfTheWeek } from '../enums';
import { Meal, Column } from '../../data-layer/models';

export interface IDay {
    id?: number;
    name: DayOfTheWeek,
    userId: number,
    meals: Meal[],
    column: Column,
    columnId?: number
}
