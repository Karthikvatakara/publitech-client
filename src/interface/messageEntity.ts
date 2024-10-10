import { Types } from "mongoose";

export interface messageEntity {
  _id: Types.ObjectId; 
  sender: Types.ObjectId | {
    _id: Types.ObjectId;
    name: string;  
  };
  content: string;
  chatId: Types.ObjectId | {
    _id: Types.ObjectId;
    isGroupChat: boolean;
    users: Types.ObjectId[]; 
    groupName?: string;
  };
  contentType: 'text' | 'image' | 'audio' | 'video' | 'file';
  recieverSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
}
