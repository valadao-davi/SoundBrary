import { DefaultInstrument } from './defaultInstrument';
import {Effect} from './efeito'

export interface Instrument {
    defaultInstrument: DefaultInstrument;
    effects: Effect[]
    model: string;
  }
  