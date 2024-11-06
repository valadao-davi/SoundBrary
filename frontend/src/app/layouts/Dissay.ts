import { Avaliation } from "./Avaliation";
import { Instrument } from "./Instrument";
import { Coment } from "./Comment";

export interface Dissay {
  _id?: string;
  name: string;
  desc?: string;
  createdAt: Date | string;
  musicId: string;
  userName: string;
  instruments: Instrument[];
  tone?: string;
  totalRate?: number;
  avaliations?: Avaliation[];
  comments?: Coment[];
}
