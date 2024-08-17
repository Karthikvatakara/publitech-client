import { Schema } from "mongoose";

export interface subscriptionPaymentEntity {
    _id?: String | Schema.Types.ObjectId;
    userId: String | Schema.Types.ObjectId;
    chatId: String | Schema.Types.ObjectId;
    method?: String,
    status?: "pending" | "completed" | "failed" | "refunded",
    amount?: Number,
    subscriptionType: "basic" | "standard" | "premium",
}
