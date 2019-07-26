import { JsonController, Get, Res, Req, Post, Body } from 'routing-controllers';
import { Response, Request } from 'express';
import { TimetableAgent } from '../../data-layer/data-agents';
import { logger } from '@bit/domiebett.budget_app.logging';

@JsonController('/timetable')
export class TimetableController {
    private timetableAgent: TimetableAgent;

    constructor() {
        this.timetableAgent = new TimetableAgent();
    }

    @Get()
    async getTimetable(@Res() res: Response ) {
        const entries = await this.timetableAgent.getTimetable();
        return res.status(200).json({entries});
    }

    @Post()
    async addTimetableEntry(@Body() requestBody, @Req() req: Request, @Res() res: Response) {
        let timetableEntry = {};
        timetableEntry['week'] = requestBody.week;
        timetableEntry['day'] = requestBody.day;
        timetableEntry['mealId'] = requestBody.mealId;

        const entry = await this.timetableAgent.addTimetableEntry(timetableEntry);
        return res.status(201).json({ entry });
    }
}
