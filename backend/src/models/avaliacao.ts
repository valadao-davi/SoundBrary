import * as mongodb from 'mongodb'

export interface Avaliacao {
    _id?: mongodb.ObjectId
    userId: string;
    rate: number;
    date: Date;
}