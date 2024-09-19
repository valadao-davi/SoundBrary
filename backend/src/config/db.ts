 import * as mongodb from 'mongodb'
 import {User} from '../models/user'
import { Dissay } from '../models/dissay';

 export const collections: {
    users?: mongodb.Collection<User>; // cria uma coleção (tabela) de usuários
    dissays?: mongodb.Collection<Dissay>;
 } = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri)
    await client.connect();

    const db = client.db("database-test")
    await applySchemaValidation(db)

    const usersCollection = db.collection<User>("users")
    const dissaysCollection = db.collection<Dissay>("dissays")
    collections.users = usersCollection
    collections.dissays = dissaysCollection
}

async function applySchemaValidation(db: mongodb.Db) {
    const userSchema = {
        $userSchema: {
            bsonType: "object",
            required: ["name", "email", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name is required and is a string'",
                    minLength: 2,
                    maxLength: 50
                },
                email: {
                    bsonType: "string",
                    description: "'email is required and is a string'",
                },
                password: {
                    bsonType: "string",
                    description: "'password is required and is a string'",
                    minLength: 8,
                    maxLength: 128
                }
            }
        }
    };
    const dissaySchema = {
        $dissaySchema: {
            BSONType: "object",
            required: ['name', 'desc', 'musicId', 'userId']
        }
    }
    // aguarda o banco de dados modificar os dados da coleção se ela não existe criar a coleção
    await db.command({
        collMod: "users",
        validator: userSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: userSchema});
        }
    });


}