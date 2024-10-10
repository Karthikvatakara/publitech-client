// InstructorEntity definition
export interface InstructorEntity {
    _id: string;
    username: string;
  }
  
  // CategoryEntity definition
  export interface CategoryEntity {
    _id: string;
    title: string;
  }
  
  // Lesson entity for nested structure
  export interface LessonEntity {
    title: string;
    description: string;
    thumbnail: string;
    video?: string;
    attachments?: {
      title: string;
      url: string;
    };
  }
  
  // Trial entity for nested structure
  export interface TrialEntity {
    title: string;
    description: string;
    thumbnail: string;
    video: string;
  }
  
  // Pricing entity for the course
  export interface PricingEntity {
    type: 'free' | 'paid';
    amount: number;
  }
  
  // Full CourseEntity definition
  export interface CoursePopulated {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    instructorRef: InstructorEntity; // Populated with InstructorEntity
    categoryRef: CategoryEntity; // Populated with CategoryEntity
    language: string;
    lessons: LessonEntity[];
    trial: TrialEntity;
    pricing: PricingEntity;
    isBlocked: boolean;
    whatWillLearn: string[];
    stage: 'requested' | 'rejected' | 'accepted';
    isVerified: boolean;
    rejectReason?: string;
    isPublished: boolean;
    isBlockedInstructor: boolean;
    noOfPurchases: number;
    createdAt: Date;
    updatedAt: Date;
  }
  