import { Types } from "mongoose";

export interface CategoryEntity {
    _id: any,
    title: string,
    isBlocked: boolean,
    imageUrl: string
}
