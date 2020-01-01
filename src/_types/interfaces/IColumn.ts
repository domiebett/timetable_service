import { Day} from "../../data-layer/models";

export interface IColumn {
    id?: number;
    weekNo: number;
    name?: string;
    days?: Day[];
    userId: number;
}
