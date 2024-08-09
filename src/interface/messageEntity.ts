import { ObjectId } from "mongoose";

enum contents {
    text = "text",
    image = "image",
    audio = "audio",
    video = "video",
    file = "file"
}

export interface messageEntity {
    _id?:  string | ObjectId,
    sender :  string | ObjectId,
    content? : string,
    chatId :  string  |ObjectId,
    contentType? : contents,
    recieverSeen : boolean,
    createdAt?: Date | string;
    updatedAt?: Date | string;
}