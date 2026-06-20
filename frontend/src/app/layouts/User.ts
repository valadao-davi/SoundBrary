import { Notiffication } from "./Notification";


export interface PaymentInfo {
  formalName: string;
  city: string;
  pixKey: string;
}


export interface User {
  userName: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  _id?: string;
  dissaySaved?: string[];
  musicSaved?: string[];
  albumSaved?: string[];
  artistsSaved?: string[];
  notifications?: Notiffication[];
  dissaysCreated?: string[];
  paymentInfo?: PaymentInfo;

}
