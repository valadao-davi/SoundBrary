import * as mongodb from 'mongodb'

export interface Comentario {
    _id?: mongodb.ObjectId
    userId: string;
    idParent: string;
    title: string;
    text: string;
}