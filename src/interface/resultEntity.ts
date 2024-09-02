import { Types } from "mongoose";

export interface resultEntity {
    _id: string | Types.ObjectId,
    assessmentRef: string  | Types.ObjectId,
    userRef: string | Types.ObjectId,
    score: number,
    isPassed: boolean,
    createdAt?: Date,
    updatedAt?: Date
}