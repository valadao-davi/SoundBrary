 import * as mongodb from 'mongodb'
 import {User} from '../models/user'

 export const collections: {
    users?: mongodb.Collection<User>; // cria uma coleção (tabela) de usuários
 } = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri)
    await client.connect();

    const db = client.db("database-test")
    await applySchemaValidation(db)

    const usersCollection = db.collection<User>("users")
    collections.users = usersCollection
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
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
    // aguarda o banco de dados modificar os dados da coleção se ela não existe criar a coleção
    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: jsonSchema});
        }
    });
}