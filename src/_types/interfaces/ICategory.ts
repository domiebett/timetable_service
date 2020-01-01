import {IMeal} from "./IMeal";

export interface ICategory {
    id?: number;
    name: string;
    defaultTime: string;
    meals: IMeal[];
    userId: number;
}
