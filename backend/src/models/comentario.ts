import * as mongodb from 'mongodb'

export interface Comment {
    _id?: mongodb.ObjectId
    userId: string;
    idParent: string;
    text: string;
    date: Date;
}