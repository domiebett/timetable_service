import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MinLength } from 'class-validator';
import { Meal } from "./Meal";

const defaultTime = '20:00';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number = null;

    @Column({
        type: 'varchar',
        length: 150,
        unique: true
    })
    @MinLength(2)
    name: string = null;

    @Column({
        type: "time",
        default: defaultTime
    })
    defaultTime: string = null;

    @OneToMany(type => Meal, meal => meal.category)
    meals: Meal[];

    @Column('integer')
    userId: number = null;
}
