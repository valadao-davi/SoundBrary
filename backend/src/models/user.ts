import * as mongodb from "mongodb"
import { Notiffication } from "./Notificacao";

export interface User {
    userName: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    _id?: mongodb.ObjectId;
    dissaySaved?: string[];
    musicSaved?: string[];
    albumSaved?: string[];
    artistsSaved?: string[];
    notifications?: Notiffication[];
    dissaysCreated?: string[];
}