import { Schema } from 'mongoose';
import { MongooseAccess } from '../adapters/MongoAccess';

export enum DayOfTheWeek {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

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

const TimetableModel = MongooseAccess.mongooseConnection.model('timetable', TimetableSchema);

export { TimetableModel, TimetableSchema };
