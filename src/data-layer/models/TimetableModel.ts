import { MongooseAccess } from '../adapters/MongoAccess';
import { TimetableSchema } from '../data-abstracts/schemas/TimetableSchema';

const TimetableModel = MongooseAccess.mongooseConnection.model('timetable', TimetableSchema);

export { TimetableModel, TimetableSchema };
