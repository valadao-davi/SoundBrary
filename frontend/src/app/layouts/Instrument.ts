import { DefaultInstrument } from "./DefaultInstrument";

export interface Instrument {
  defaultInstrument: DefaultInstrument;
  effects: {[effect: string]: string}
}
