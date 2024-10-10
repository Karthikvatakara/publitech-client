import { assessmentEntity } from "./assessmentEntity";

export interface PopulatedCourse {
    _id: string; 
    title: string;
}

export interface PopulatedAssessmentEntity extends Omit<assessmentEntity, 'courseId'> {
    courseId: PopulatedCourse; 
}

export interface PopulatedAssessmentDocument extends Document, PopulatedAssessmentEntity {}
