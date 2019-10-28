import { Meal } from '../models';
import {BaseAgent} from "./BaseAgent";

export class MealAgent extends BaseAgent {
    constructor() {
        super(Meal);
    }
}
