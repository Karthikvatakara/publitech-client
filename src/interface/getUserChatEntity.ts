

import { UserEntity } from './UserEntity';
import { messageEntity } from './messageEntity';
import { Types } from 'mongoose';

// Adjusted chatEntity interface
export interface getUserChatEntity {
  _id: string;
  isGroupChat: boolean;
  users: (UserEntity | Types.ObjectId)[];  // Users can be UserEntity or ObjectId before population
  latestMessage: messageEntity | Types.ObjectId | null;  // Latest message can be messageEntity or ObjectId before population
  groupName?: string;
  groupAdmin?: UserEntity | Types.ObjectId;  // Similar for groupAdmin
  subscriptionType: 'none' | 'basic' | 'standard' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}
