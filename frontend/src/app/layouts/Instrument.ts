import { DefaultInstrument } from "./DefaultInstrument";
import { Effect } from "./Effect";


export interface Instrument {
    defaultInstrument: DefaultInstrument;
    effects: Effect[]
    model: string;
  }
  