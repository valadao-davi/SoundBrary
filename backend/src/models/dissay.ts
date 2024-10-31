import * as mongodb from 'mongodb'
import {Instrumento} from './instrumento'
import {Avaliacao} from './avaliacao'
import {Comentario} from './comentario'

export interface Dissay {
    _id?: mongodb.ObjectId
    name: string;
    desc: string;
    createdAt: Date;
    musicId: string;
    userId: string;
    instruments: Instrumento;
    tone: string;
    bpm: number;
    avaliations: Avaliacao[];
    comments: Comentario[];
}