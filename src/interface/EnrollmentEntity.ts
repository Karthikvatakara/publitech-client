
interface LessonProgress {
    lessonId:  string,
    totalTimeWatched: number
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