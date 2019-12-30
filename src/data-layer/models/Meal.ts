import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import {Column} from "./Column";
import {DayOfTheWeek} from "../../_types/enums";
import {Category} from "./Category";
import { Day } from "./Day";


@Entity()
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn()
    mealId: number;

    @ManyToOne( type => Day, day => day.meals)
    day: Day;

    @ManyToOne(type => Day, day => day.meals)
    category: Category;

    @DbColumn({
        type: 'time'
    })
    time: string;

    @DbColumn('integer')
    userId: number;
}
