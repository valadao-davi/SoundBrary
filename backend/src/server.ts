import { getAcessToken } from './config/spotifyConfig';
import { userRouter } from './routes/user.routes';
import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/db';
import musicRoutes from '../src/routes/music.routes'
import artistRoutes from '../src/routes/artist.routes'
import albumRoutes from '../src/routes/album.routes'
import playlistRoutes from '../src/routes/playlist.routes'

dotenv.config({path: './src/.env'})
// const { MONGODB_URI } = process.env;


// if( !MONGODB_URI ) {
//     console.error("Não foi definido nenhuma variável no config.env");
//     process.exit(1)
// }

// connectToDatabase(MONGODB_URI)
//     .then(()=> {
        
       
        
//     })
//     .catch((error)=> console.error(error))
const app = express();

app.use(express.json())
app.use(cors())


const initializeToken = async () => {
    try {
        await getAcessToken()
        console.log("Token inicializado")
    }catch(E){
        console.error("Houve um erro: ", E)
    }
}

initializeToken().then(() => {
    
   app.use('/music', musicRoutes)
   app.use('/artists', artistRoutes)
   app.use('/playlist', playlistRoutes)
   app.use('/album', albumRoutes)

   app.listen(3000, ()=> {
    console.log(`Server funcionando na porta 3000...`)
    });
})

