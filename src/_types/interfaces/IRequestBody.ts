import { ICategory } from "./ICategory";
import { IColumn } from "./IColumn";
import { IDay } from "./IDay";
import { IUser } from "./IUser";
import { IMeal } from "./IMeal";

export type IRequestBody = ICategory | IColumn | IDay | IMeal;
