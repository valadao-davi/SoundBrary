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
            required: ["userName", "name", "email", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                userName: {
                    bsonType: "string",
                    description: "username is required and is a string",
                    minLength: 2,
                    maxLength: 50
                },
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
                    description: "DissaysSaved is a optional array parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                musicSaved: {
                    bsonType: ["array", "null"],
                    description: "MusicsSaved is an optional list object parameter that can be null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                albumSaved: {
                    bsonType: ["array", "null"],
                    description: "AlbumSaved is an optional list object parameter that can be null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                artistsSaved: {
                    bsonType: ["array", "null"],
                    description: "ArtistsSaved an optional list object parameter that can be null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },
                dissaysCreated: {
                    bsonType: ["array", "null"],
                    description: "DissaysCreated is an optional array parameter or null",
                    items: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 128
                    }
                },

                
            }
        
    };
    const dissaySchema = {  
            bsonType: "object",
            required: ['name', 'userName', 'musicId', 'instruments'],
            additionalProperties: false,
            properties: {
                _id: {},
                userName: {
                    bsonType: "string",
                    description: "username is required and is a string",
                    minLength: 2,
                    maxLength: 50
                },
                name: {
                    bsonType: "string",
                    description: "'name is required and is a string'",
                    minLength: 2,
                    maxLength: 50
                },
                musicId: {
                    bsonType: "string",
                    description: "musicId is required and is a string",
                    minLength: 2,
                    maxLength: 50
                },
                instruments: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["nameInstrument", "effects"],
                        properties: {
                            nameInstrument: {
                                bsonType: "string",
                                description: "Name of the instrument",
                                minLength: 2,
                                maxLength: 50
                            },
                            effects: {
                                bsonType: "object",
                                description: "Effects of the instrument",
                                additionalProperties: {
                                    bsonType: "double"
                                }
                            }
                        }
                    }
                },
                tone: {
                    bsonType: ["string", "null"],
                    description: "Tone its optional and is a string",
                    minLength: 1,
                    maxLength: 10
                },
                bpm: {
                    bsonType: ["number", "null"],
                    description: "bpm its optional and is a string",
                },
                avaliations: {
                    bsonType: ["array", "null"],
                    description: "avaliations its optional and is array object",
                    items: {
                        bsonType: "object",
                        required: ["userName", "rate", "date"],
                        properties: {
                            _id: {},
                            userName: {
                                bsonType: "string",
                                description: "username is required and is a string",
                                minLength: 2,
                                maxLength: 50
                            },
                            rate: {
                                bsonType: "double",
                                description: "rate its the number of avaliation"
                            },
                            date: {
                                bsonType: "date",
                                description: "The date was made"
                            }
                        }
                    },
                    
                },
                comments: {
                    bsonType: ["array", "null"],
                    description: "avaliations its optional and is array object",
                    items: {
                        bsonType: "object",
                        required: ["userName", "text", "date"],
                        properties: {
                            _id: {},
                            userName: {
                                bsonType: "string",
                                description: "username is required and is a string",
                                minLength: 2,
                                maxLength: 50
                            },
                            text: {
                                bsonType: "string",
                                description: "username is required and is a string",
                                minLength: 2,
                                maxLength: 125,
                            },
                            idParent: {
                                bsonType: "string",
                                description: "its an optional string that connects to parent comment",
                                minLength: 2,
                                maxLength: 50
                            },
                            date: {
                                bsonType: "date",
                                description: "The date was made"
                            }
                        }
                    },
                    
                }

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
    await db.command({
        collMod: "dissays",
        validator: {$jsonSchema: dissaySchema}
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("dissay", {validator: {$jsonSchema: dissaySchema}});
        }
    });


}