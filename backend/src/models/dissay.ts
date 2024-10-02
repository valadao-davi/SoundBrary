import * as mongodb from 'mongodb'

export interface Dissay {
    name: string;
    desc: string;
    createdAt: string;
    musicId: string;
    userId: mongodb.ObjectId
}