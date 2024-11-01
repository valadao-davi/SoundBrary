import * as mongodb from 'mongodb'


export interface Comment {
    _id?: mongodb.ObjectId;
    userName: string;
    idParent?: string;
    text: string;
    date: Date;
}
