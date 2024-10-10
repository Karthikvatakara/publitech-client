import { Types } from "mongoose";

interface questionEntity {
  question: string;
  options: { option: string }[]; // Array of option objects
  answer: string;
}

export interface assessmentEntity {
  _id: string | Types.ObjectId;
  instructorId: Types.ObjectId;
  courseId: Types.ObjectId;
  title: string;
  type?: string; 
  questions: questionEntity[];
  questionScore: number;
  totalScore: number;
  passingScore: number;
  numQuestions: number;
  createdAt?: Date; 
  updatedAt?: Date;
}
