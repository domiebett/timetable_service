import {Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToMany, OneToMany, Index} from "typeorm";
import {Meal} from "./Meal";
import { Day } from "./Day";

@Entity()
@Index("weekNo_and_name_index", (column: Column) => [column.weekNo, column.name], { unique: true })
export class Column {
    @PrimaryGeneratedColumn()
    id: number;

    @DbColumn({
        type: 'integer'
    })
    weekNo: number;

    @DbColumn({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    name: string;

    @OneToMany(type => Day, day => day.column, { onDelete: 'CASCADE', cascade: true})
    days: Day[];

    @DbColumn('integer')
    userId: number;
}
