import { avaliationRouter } from './routes/avaliation.routes';
import { commentRouter } from './routes/comment.routes';

import { dissayRouter } from './routes/dissay.routes';
import { getAcessToken } from './config/spotifyConfig';
import { userRouter } from './routes/user.routes';
import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/db';
import musicRoutes from './routes/music.routes'
import artistRoutes from './routes/artist.routes'
import albumRoutes from './routes/album.routes'
import searchRoutes from './routes/searchGeneral.routes'
import playlistRoutes from './routes/playlist.routes'
import { paymentRoutes } from './routes/payment.routes';

dotenv.config()

const { MONGODB_URI } = process.env;
const PORT = process.env.PORT || 3000;


if (!MONGODB_URI) {
    console.error("A variável MONGODB_URI não está definida.");
    process.exit(1)
}

const app = express();
app.use(express.json())
app.use(cors())

//Inicializa o token
const initializeToken = async () => {
    try {
        await getAcessToken()
        console.log("Token inicializado")
    }catch(E){
        console.error("Houve um erro: ", E)
    }
}
//Conecta ao banco de dados
const startServer = async () => {
    try {
        await connectToDatabase(MONGODB_URI!)
        console.log("Conectado ao banco")
        
        app.use('/users', userRouter)
        app.use('/dissays', dissayRouter)
        app.use('/avaliations', avaliationRouter)
        app.use("/comments", commentRouter)

        await initializeToken()
        console.log("Token inicializado")

        app.use('/music', musicRoutes)
        app.use('/artists', artistRoutes)
        app.use('/playlist', playlistRoutes)
        app.use('/album', albumRoutes)
        app.use('/allSearch', searchRoutes)
        app.use('/payment', paymentRoutes)

        app.listen(PORT, () => {
            console.log(`Server funcionando na porta ${PORT}...`)
        })
    } catch(error) {
        console.error("Erro ao iniciar servidor:", error)
        process.exit(1)
    }
}

startServer()
