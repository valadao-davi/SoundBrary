import { Avaliation } from "./Avaliation";
import { Instrument } from "./Instrument";

export interface Dissay {
  _id?: string;
  name: string;
  desc?: string;
  createdAt: Date;
  musicId: string;
  userName: string;
  instruments: Instrument[];
  tone?: string;
  bpm?: number;
  avaliations?: Avaliation[];
  comments?: Comment[];
}
