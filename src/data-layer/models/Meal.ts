import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import {Category} from "./Category";
import { Day } from "./Day";


@Entity()
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn()
    mealId: number;

    @ManyToOne( type => Day, day => day.meals, { onDelete: 'CASCADE' })
    day: Day;

    @ManyToOne(type => Category, category => category.meals)
    category: Category;

    @DbColumn({
        type: 'time'
    })
    time: string;

    @DbColumn('integer')
    userId: number;
}
