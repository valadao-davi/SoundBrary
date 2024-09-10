import { userRouter } from './routes/user.routes';
import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/db';

dotenv.config({path: './src/.env'})
const { MONGODB_URI } = process.env;


if( !MONGODB_URI ) {
    console.error("Não foi definido nenhuma variável no config.env");
    process.exit(1)
}

connectToDatabase(MONGODB_URI)
    .then(()=> {
        const app = express()
        app.use(cors())
        app.use("/users", userRouter)
        app.listen(3000, ()=> {
            console.log(`Server funcionando na porta 3000...`)
        });
    })
    .catch((error)=> console.error(error))