import * as mongodb from 'mongodb'
import {User} from '../models/user'
import { Dissay } from '../models/dissay';

 export const collections: {
    users?: mongodb.Collection<User>; // cria uma coleção (tabela) de usuários
    dissays?: mongodb.Collection<Dissay>;
 } = {};

export async function connectToDatabase(uri: string) {
    try {
        const client = new mongodb.MongoClient(uri);
        await client.connect();
        console.log("Conexão ao banco de dados estabelecida.");
        
        const db = client.db("database-test");
        await applySchemaValidation(db);

        collections.users = db.collection<User>("users");
        collections.dissays = db.collection<Dissay>("dissays");
        console.log("Coleções atribuídas com sucesso.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
}

async function applySchemaValidation(db: mongodb.Db) {
    const userSchema = {
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
                },
                image: {
                    bsonType: ["string", "null"],
                    description: "Image is an optional string parameter or null",
                    minLength: 8,
                    maxLength: 128
                },
                dissaySaved: {
                    bsonType: ["array", "null"],
                    description: "DissaysSaved is an optional array parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                musicSaved: {
                    bsonType: ["array", "null"],
                    description: "MusicsSaved is an optional string parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                albumSaved: {
                    bsonType: ["array", "null"],
                    description: "AlbumSaved is an optional string parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                artistsSaved: {
                    bsonType: ["array", "null"],
                    description: "ArtistsSaved is an optional string parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },

                
            }
        
    };
    const dissaySchema = {
        $dissaySchema: {
            BSONType: "object",
            required: ['name', 'musicId', 'userId', 'instruments'],
            additionalProperties: false,
            // properties: {
            //     _id: {},
            //     name:
            // }
        }
    }
    // aguarda o banco de dados modificar os dados da coleção se ela não existe criar a coleção
    await db.command({
        collMod: "users",
        validator: {$jsonSchema: userSchema}
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: {$jsonSchema: userSchema}});
        }
    });


}