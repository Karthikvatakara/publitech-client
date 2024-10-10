import { ObjectId } from "mongoose";

export interface LessonEntity {
    _id?: string,
    title: string,
    description: string,
    thumbnail: string,
    video: string,
    attachments?: {
        title: string;
        url: string
    }
}

interface Trial {
    title: string,
    description: string,
    thumbnail: string,
    video: string
}

enum PriceType {
    free = 'free',
    paid = 'paid'
}

interface Pricing {
    amount: number,
    type: PriceType
}

 export enum stageType {
    requested = "requested",
    rejected = "rejected",
    accepted = "accepted"
}
export interface CourseEntity {
    _id: string,
    title: string,
    description: string,
    thumbnail: string,
    instructorRef: ObjectId,
    categoryRef: ObjectId,
    language?: string,
    lessons: [LessonEntity],
    trial: Trial,
    isPaid: boolean,
    createdAt?: Date;
    updatedAt?: Date;
    pricing: Pricing;
    whatWillLearn: [string]
    isBlocked?: boolean | string;
    isPublished?: boolean ;
    stage?: stageType;
    isVerified?: boolean;
    rejectReason?: string;
    isBlockedInstructor: boolean;
    noOfPurchases: number;
}