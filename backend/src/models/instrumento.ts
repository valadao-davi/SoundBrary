import { DefaultInstrument } from './defaultInstrument';
export interface Instrument {
    defaultInstrument: DefaultInstrument;
    effects: {
      [effect: string]: Array<{ [parameter: string]: string }>
    };
    model: string;
  }
  