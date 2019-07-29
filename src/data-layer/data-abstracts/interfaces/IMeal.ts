export interface IMeal {
    id: Number,
    type: String,
    foods: IFood[]
}

export interface IFood {
    id: Number,
    name: String,
    price: Number,
    type: String
}
