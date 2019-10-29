import { Column } from "../models";
import {BaseAgent} from "./BaseAgent";

export class ColumnAgent extends BaseAgent {
    constructor() {
        super(Column);
    }
}
