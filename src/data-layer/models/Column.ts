import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, OneToMany} from "typeorm";
import {Meal} from "./Meal";

@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn({
        unique: true
    })
    weekNo: number;

    @DbColumn({
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: true
    })
    name: string;

    @OneToMany(type => Meal, meal => meal.column)
    meals: Meal[];

    @DbColumn('integer')
    userId: number;
}
