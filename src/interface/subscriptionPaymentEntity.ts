import { Schema } from "mongoose";

export interface Participant {
    username: string;
    userId: string | Schema.Types.ObjectId;
}

export interface ChatDetails {
    isGroupChat: boolean;
    subscriptionType: "basic" | "standard" | "premium";
}

export interface subscriptionPaymentEntity {
    _id?: String | Schema.Types.ObjectId;
    userId: String | Schema.Types.ObjectId;
    chatId: String | Schema.Types.ObjectId;
    method?: String;
    status?: "pending" | "completed" | "failed" | "refunded";
    amount?: Number;
    subscriptionType: "basic" | "standard" | "premium";
    participants: Participant[];  // Array of participants
    chatDetails: ChatDetails;  // Chat details with group chat status and subscription type
}
