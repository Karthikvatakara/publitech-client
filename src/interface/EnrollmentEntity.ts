
export interface LessonProgress {
    lessonId: string;
    lastWatchedPosition?: number;
    totalTimeWatched?: number;
    isCompleted?: boolean; 
  }
  

export interface EnrollmentEntity {
    _id?: string;
    userId: string;
    courseId: string;
    enrolledAt?: string;
    progress?: {
        completedLessons?: string[] | [] | null;
        completedAssessments?: string[] | [] | null;
        currentLesson?: string;
        lessonProgress?: LessonProgress[] | null
    }
}