import * as mongodb from 'mongodb'

export interface Avaliation {
    _id?: mongodb.ObjectId
    userId: string;
    rateNumber: number;
    date: Date;
}