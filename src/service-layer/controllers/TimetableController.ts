import { JsonController, Get, Res, Req } from 'routing-controllers';
import { Response, Request } from 'express';

@JsonController('/timetable')
class TimetableController {
    constructor() { }

    @Get('/')
    async getTimetable(@Res() res: Response ) {
        return res.status(200).json({ message: 'timetables fetched succesfully' });
    }
}
