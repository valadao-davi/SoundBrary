import * as mongodb from 'mongodb'

export interface Dissay {
    _id?: mongodb.ObjectId
    name: string;
    desc: string;
    createdAt: string;
    musicId: string;
    userId: string;

}