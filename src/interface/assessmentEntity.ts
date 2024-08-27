import { Types } from "mongoose";


interface questionEntity {
    question: string,
    options: { option:string }[],
    answer: string
}

export interface assessmentEntity {
    _id: string | Types.ObjectId,
    instructorId: Types.ObjectId,
    courseId: Types.ObjectId,
    title: string,
    type?: string,
    questions :questionEntity[],
    questionScore: number,
    totalScore: number,
    passingScore: number,
}