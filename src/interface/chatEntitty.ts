import { ObjectId } from "mongoose";    

export interface chatEntity {
    _id?:   string |ObjectId,
    isGroupChat : boolean,
    users: [  string |ObjectId ],
    latestMessage: string | ObjectId,
    groupName: String,
    groupAdmin: string |ObjectId,
    subscriptionType: 'none' | 'basic' | 'standard' | 'premium';  
    createdAt?: Date | string;
    updatedAt?: Date | string;
}