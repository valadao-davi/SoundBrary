import { Dissay } from './dissay';
import * as mongodb from "mongodb"

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
    dissays_created?: Dissay[];
}