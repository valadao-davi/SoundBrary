import { DefaultInstrument } from './defaultInstrument';
export interface Instrument {
    defaultInstrument: DefaultInstrument;
    effects: {[effect: string]: string}
  }
  