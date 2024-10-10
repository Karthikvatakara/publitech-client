// Import ObjectId type from mongoose
import { Types } from "mongoose";
import { UserEntity } from "./UserEntity";

export interface Lesson {
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  attachments?: {
    title?: string;
    url?: string;
  };
}

export interface Trial {
  title: string;
  description: string;
  thumbnail: string;
  video: string;
}

export interface Pricing {
  type: "free" | "paid";
  amount: number;
}

export interface SingleCourseEntity {
  _id: Types.ObjectId; // MongoDB document ID
  title: string;
  description: string;
  thumbnail: string;
  instructorRef:  UserEntity; // Reference to the instructor (user)
  categoryRef: Types.ObjectId; // Reference to the category
  language: string;
  lessons: Lesson[];
  trial?: Trial; // Optional
  pricing: Pricing;
  isBlocked: boolean;
  whatWillLearn?: string[];
  stage: "requested" | "rejected" | "accepted";
  isVerified: boolean;
  rejectReason?: string; // Optional
  isPublished: boolean;
  isBlockedInstructor: boolean;
  noOfPurchases: number;
  createdAt?: Date; // Timestamp fields (automatically added by Mongoose)
  updatedAt?: Date; // Timestamp fields (automatically added by Mongoose)
}
