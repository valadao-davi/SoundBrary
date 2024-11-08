import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const userRouter = express.Router();
userRouter.use(express.json())
dotenv.config({path: './src/.env'})
const { ACCESS_SECRET } =  process.env

interface CustomRequest extends Request {
    token?: JwtPayload; // A propriedade token pode ser undefined
}



//Verificação se o token do usuário é valido
export const auth = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]

        if(!token){
            throw new Error()
        }
        const decoded = jwt.verify(token, `${ACCESS_SECRET}`) as JwtPayload
        req.token = decoded
        next();
    } catch(err){
        console.error("Erro no middleware de autenticação: ", err);

    }
}

//faz uma requisição ao servidor utilizando a rota HTTP: url/users/createUser no método .post para criar um usuário
userRouter.post('/createUser', async(req, res)=> {
    try{
        const user = req.body
        const email = req.body.email
        const getUserName =  req.body.userName
        const userNameFormatted = `@${getUserName}`
        const existUserEmail = await collections?.users?.findOne({email: email})
        const existUserName = await collections?.users?.findOne({userName: userNameFormatted})

        if(existUserName){
            console.log("aqui")
            return res.status(409).json({account: "userName"})
        }if(existUserEmail){
            return res.status(409).send({account: "email"})
        }else{
            const newUser = {
                name: user.name,
                email: email,
                userName: userNameFormatted,
                password: user.password
            }
            const result = await collections?.users?.insertOne(newUser)
            if(result?.acknowledged){
                return res.status(200).send()
            }else{
                return res.status(500).send("Ocorreu um erro ao criar o usuário")
            }
        }
    }catch(error){
        console.error(error)
        return res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})

userRouter.patch('/addToFavorites/songs', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        console.log("id: ", item + ", userid: ", userId)
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {musicSaved: item}})
            if(result){
                res.status(200)
            }else{
                console.log("Erro aqui")
                res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

userRouter.patch('/removeFavorites/songs', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {musicSaved: item}})
            if(result){
                res.status(200)
            }else{
                console.log("Erro aqui")
                res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

userRouter.patch('/addToFavorites/albums', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        console.log("id: ", item + ", userid: ", userId)
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {albumSaved: item}})
            if(result){
                res.status(200)
            }else{
                console.log("Erro aqui")
                res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

userRouter.patch('/removeFavorites/albums', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {albumSaved: item}})
            if(result){
                res.status(200)
            }else{
                console.log("Erro aqui")
                res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

userRouter.patch('/addToFavorites/artists', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        console.log("id: ", item + ", userid: ", userId)
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {artistsSaved: item}})
            if(result){
                res.status(200)
            }else{
                res.status(500).send("Ocorreu um erro ao salvar seu item")
            }
        }else{
            res.status(400).send("Por favor autentique para salvar o item")
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})
userRouter.patch('/addToFavorites/artists', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {_artistsSaved: item}})
            if(result){
                res.status(200)
            }else{
                res.status(500).send("Ocorreu um erro ao salvar seu item")
            }
        }else{
            res.status(400).send("Por favor autentique para salvar o item")
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})

userRouter.patch('/removeFavorites/artists', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {_artistsSaved: item}})
            if(result){
                res.status(200)
            }else{
                res.status(500).send("Ocorreu um erro ao salvar seu item")
            }
        }else{
            res.status(400).send("Por favor autentique para salvar o item")
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})
userRouter.patch('/addToFavorites/albums', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {_albumSaved: item}})
            if(result){
                res.status(200)
            }else{
                res.status(500).send("Ocorreu um erro ao salvar seu item")
            }
        }else{
            res.status(400).send("Por favor autentique para salvar o item")
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})

userRouter.patch('/removeFavorites/albums', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {_albumSaved: item}})
            if(result){
                res.status(200)
            }else{
                console.log("Erro aqui")
                res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

userRouter.patch('/removeFavorites/artists', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            console.log("validos")
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {artistsSaved: item}})
            if(result){
                return res.status(200)
            }else{
                console.log("Erro aqui")
                return res.status(500).json({error: "Erro ao salvar seu item"})
            }
        }else{
            return res.status(400).json({error: "Autentique para continuar"})
        }
    }catch(error){
        console.error("Erro no método add to favorites: ", error)
        res.status(500).json({error: error})
    }
})

//Retorna o perfil do usuario
userRouter.get('/profile', auth, async(req: CustomRequest, res: Response)=> {
    try{
        const userId = req.token?.sub;
        const user = await collections?.users?.findOne({_id: new ObjectId(userId)})
        if(userId && !ObjectId.isValid(userId)){
            return res.status(400).send("ID de usuário inválido");
        }
        if(user){
            res.status(200).send({userName: user.userName,email: user.email, name: user.name, musicSaved: user.musicSaved, artistsSaved: user.artistsSaved, albumSaved: user.albumSaved,dissaySaved: user.dissaySaved, dissaysCreated: user.dissaysCreated, notifications: user.notifications})
        }else{
            res.status(404).send("Usuário não encontrado")
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})


//Retorna todos os usuarios - TESTE
userRouter.get('/', async(_req, res)=> {
    try{
        const users = await collections?.users?.find({}).toArray();
        res.status(200).send(users)
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

userRouter.get('/profile/:query', async(req, res)=> {
    try{
        const name = req.params?.query
        if(name){
            const userFound = await collections?.users?.findOne({userName: name})
            if(userFound){
                res.status(200).json({userName: userFound.userName, name: userFound.name, image: userFound.image, musicSaved: userFound.musicSaved, albumSaved: userFound.albumSaved, artistsSaved: userFound.artistsSaved, dissaySaved: userFound.dissaySaved, dissaysCreated: userFound.dissaysCreated})
            }
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})



userRouter.post('/login', async(req, res)=> {
    try {
        const userOrEmail = req.body.userOrEmail
        const password = req.body.password
        const checkUser = await collections?.users?.findOne({$or: [{email: userOrEmail}, {userName: userOrEmail}]})
        if(!checkUser){
            return res.status(404).send("Usuário não encontrado")
        }
        
        if(checkUser?.password === password){
            const token = jwt.sign({sub: checkUser?._id, userName: checkUser?.userName},`${ACCESS_SECRET}`)
            return res.json({accessToken: token})
        }else{
            return res.status(404).send("Usuário não encontrado")
        }        
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})


//função de editar
userRouter.put("/profile/edit", auth, async(req: CustomRequest, res)=> {
    try{
        const id = req.token?.sub
        const existUser = await collections?.users?.findOne({ _id: new ObjectId(id)})
        const user = req.body
        if(existUser){
            const result = await collections?.users?.updateOne(existUser, {$set: user})
            if(result && result.matchedCount){
                res.status(201).send(`Usuário alterado com sucesso: ${result}`)
            }else if(!result){
                res.status(404).send(`Não foi possível editar este usuário`)
            }
        }else {
            res.status(400).send(`Por favor autentique para continuar`)
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})

//função de deletar
userRouter.delete('/:id', async(req, res)=> {
    try {
        const id = req?.params?.id
        const query = { _id: new ObjectId(id)}
        const result = await collections?.users?.deleteOne(query)

        if(result && result.deletedCount){
            res.status(200).send({"message": "usuario deletado com sucesso"})
        }else if (!result){
            res.status(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
        }else if (!result.deletedCount){
            res.status(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})