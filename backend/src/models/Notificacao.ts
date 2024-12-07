import * as mongodb from 'mongodb'


export interface Notiffication {
    _id?: mongodb.ObjectId;
    title: string;
    type: string;
    idObject: string;
    idOptional?: string;
}