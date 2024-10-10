import {  Types } from "mongoose";

export interface ChatDetailsEntity {
    isGroupChat: boolean;
    groupName: string;
    subscriptionType: "basic" | "standard" | "premium";
  }
  
  export interface ParticipantEntity {
    _id: Types.ObjectId;
    username: string;
  }
  

export interface SubscriptionPaymentEntityPopulated {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    chatId: Types.ObjectId;
    method: string;
    status: "pending" | "completed" | "failed" | "refunded";
    amount: number;
    subscriptionType: "basic" | "standard" | "premium";
    chatDetails: ChatDetailsEntity;
    participants: ParticipantEntity[];
  }