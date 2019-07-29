import { JsonController, Get, Res, Req, Post, Body, Param } from 'routing-controllers';
import { Response, Request } from 'express';
import { TimetableAgent } from '../../data-layer/data-agents';
import { logger } from '@bit/domiebett.budget_app.logging';

@JsonController('/entries')
export class TimetableController {
    private timetableAgent: TimetableAgent;

    constructor() {
        this.timetableAgent = new TimetableAgent();
    }

    @Get()
    async getTimetableEntries(@Res() res: Response ) {
        const entries = await this.timetableAgent.getTimetableEntries();
        return res.status(200).json({entries});
    }

    @Get('/:id')
    async getSingleTimetableEntry(@Param('id') id: string, @Res() res: Response) {
        const entry = await this.timetableAgent.getSingleTimetableEntry(id);
        return res.status(200).json({ entry });
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
