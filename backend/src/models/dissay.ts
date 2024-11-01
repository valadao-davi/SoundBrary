import * as mongodb from 'mongodb'
import {Instrument} from './instrumento'
import {Avaliation} from './avaliacao'
import {Comment} from './comentario'

export interface Dissay {
    _id?: mongodb.ObjectId
    name: string;
    desc?: string;
    createdAt: Date;
    musicId: string;
    userId: string;
    instruments: Instrument[];
    tone?: string;
    bpm?: number;
    avaliations?: Avaliation[];
    comments?: Comment[];
}