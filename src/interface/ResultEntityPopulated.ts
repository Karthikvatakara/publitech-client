import { Types } from "mongoose";

export interface AssessmentRef {
  _id: Types.ObjectId;
  title: string;
}

export interface ResultEntityPopulated {
  _id: Types.ObjectId;
  assessmentRef: AssessmentRef; 
  userRef: Types.ObjectId;
  score: number;
  totalScore: number;
  isPassed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
