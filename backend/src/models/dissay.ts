import * as mongodb from 'mongodb'
import {Instrument} from './instrumento'
import {Avaliation} from './avaliacao'
import {Comment} from './comentario'

export interface Dissay {
    _id?: mongodb.ObjectId;
    name: string;
    desc?: string;
    createdAt: Date;
    musicId: string;
    userName: string;
    instruments: Instrument[];
    tone?: string;
    avaliations?: Avaliation[];
    totalRate?: number;
    comments?: Comment[];
  }
  