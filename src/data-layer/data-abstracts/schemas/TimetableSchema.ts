import { Schema } from 'mongoose';
import { DayOfTheWeek } from './../enums';

let TimetableSchema: Schema = new Schema({
    day: {
        type: DayOfTheWeek,
        required: true
    },
    week: {
        type: Number,
        required: true,
        default: 1
    },
    mealId: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

TimetableSchema.pre('save', (next: any) => {
    if (this._doc) {
        let doc = this._doc;
        let now = new Date();

        if (!doc.createdAt) {
            doc.createdAt = now;
        }

        doc.lastUpdated = now;
    }

    next();
});

export { TimetableSchema };
