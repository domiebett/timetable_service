import { Entity, PrimaryGeneratedColumn, Column as DbColumn, OneToMany, ManyToOne } from 'typeorm';
import { DayOfTheWeek } from '../../_types/enums';
import { Meal } from './Meal';
import { Column } from './Column';

@Entity()
export class Day {
    constructor(column: Column, name: DayOfTheWeek, userId: number) {
        this.column = column;
        this.name = name;
        this.userId = userId;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn({
        type: 'varchar'
    })
    name: DayOfTheWeek;

    @DbColumn('integer')
    userId: number;

    @OneToMany(type => Meal, meal => meal.day, { onDelete: 'CASCADE'})
    meals: Meal[];

    @ManyToOne(type => Column, column => column.days)
    column: Column;
}
