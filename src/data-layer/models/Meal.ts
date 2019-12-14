import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import {Column} from "./Column";
import {DayOfTheWeek} from "../../_types/enums";
import {Category} from "./Category";


@Entity()
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn()
    mealId: number;

    @DbColumn({
        type: 'varchar'
    })
    day: DayOfTheWeek;

    @ManyToOne( type => Column, column => column.meals)
    column: Column;

    @ManyToOne(type => Category, category => category.meals)
    category: Category;

    @DbColumn({
        type: 'time'
    })
    time: string;

    @DbColumn('integer')
    userId: number;
}
