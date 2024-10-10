import { ResultEntityPopulated } from "./ResultEntityPopulated";

export interface ExamCardProps {
    title: string;
    score: number;
    totalScore: number;
    isPassed: boolean;
    resultData: ResultEntityPopulated;
    createdAt: Date;
  }