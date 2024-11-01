import * as mongodb from 'mongodb'

export interface Avaliation {
    _id?: mongodb.ObjectId
    userName: string;
    rate: number;
    date: Date;
}