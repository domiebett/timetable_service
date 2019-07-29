import { Document } from 'mongoose';
import { IMeal } from './IMeal';
import { DayOfTheWeek } from '../enums/DayOfTheWeek';

export interface ITimetableDocument extends Document {
    day: DayOfTheWeek,
    week: Number,
    mealId: Number,
    meal: IMeal;
    createdAt: Date,
    lastUpdated: Date
}
