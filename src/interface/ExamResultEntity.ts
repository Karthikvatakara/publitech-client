import { UserEntity } from "./UserEntity";
import { assessmentEntity } from "./assessmentEntity";

export interface ExamResultEntity {
    _id: string;
    assessmentRef: assessmentEntity;
    userRef: UserEntity;
    score: number; 
    totalScore: number; 
    isPassed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResultDocument extends Document, ExamResultEntity {}
