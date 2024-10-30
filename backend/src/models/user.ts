import { Dissay } from './dissay';
import * as mongodb from "mongodb"

export interface User {
    name: string;
    email: string;
    password: string;
    image?: string;
    _id?: mongodb.ObjectId;
    _dissaySaved?: string[];
    _musicSaved?: string[];
    _albumSaved?: string[];
    _artistsSaved?: string[];
    _dissays_created?: Dissay[];
}