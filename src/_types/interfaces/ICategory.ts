import {IMeal} from "./IMeal";

export interface ICategory {
    name: string;
    defaultTime: string;
    meals: IMeal[];
    userId: number;
}
