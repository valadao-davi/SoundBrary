import * as mongodb from "mongodb"

export interface User {
    name: string;
    email: string;
    password: string;
    _id?: mongodb.ObjectId;
}