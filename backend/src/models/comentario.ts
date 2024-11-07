import * as mongodb from 'mongodb'


export interface Comment {
    _id?: mongodb.ObjectId;
    userName: string;
    idParent?: string;
    idParentAwnser?: string;
    text: string;
    date: Date;
}
