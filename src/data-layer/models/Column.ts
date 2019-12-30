import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, OneToMany} from "typeorm";
import {Meal} from "./Meal";
import { Day } from "./Day";

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

    @OneToMany(type => Day, day => day.column)
    days: Day[];

    @DbColumn('integer')
    userId: number;
}
