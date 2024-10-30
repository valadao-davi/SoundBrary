import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const userRouter = express.Router();
userRouter.use(express.json())
dotenv.config({path: './src/.env'})
const { ACESS_SECRET } =  process.env
console.log(ACESS_SECRET)

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
        const decoded = jwt.verify(token, `${ACESS_SECRET}`) as JwtPayload
        req.token = decoded
        next();
    } catch(err){
        res.status(401).send("Please authenticate")

    }
}

//faz uma requisição ao servidor utilizando a rota HTTP: url/users/createUser no método .post para criar um usuário
userRouter.post('/createUser', async(req, res)=> {
    try{
        const user = req.body
        const email = req.body.email
        const existUser = await collections?.users?.findOne({email: email})

        if(existUser){
            res.status(400).send("Email já existente")
        }
        else{
            const result = await collections?.users?.insertOne(user)
            if(result?.acknowledged){
                res.status(201).send("Usuário criado com sucesso")
            }else{
                res.send(500).send("Ocorreu um erro ao criar o usuário")
            }
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})

userRouter.patch('/addToFavorites/songs', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$push: {_musicSaved: item}})
            if(result){
                res.status(200).send("Item salvado com sucesso")
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

userRouter.patch('/removeFavorites/songs', auth, async(req: CustomRequest, res: Response)=>{
    try{
        const userId = req.token?.sub;
        const item = req.body.id
        if(userId && item){
            const result = await collections?.users?.findOneAndUpdate({_id: new ObjectId(userId)}, {$pull: {_musicSaved: item}})
            if(result){
                res.status(200).send("Item salvado com sucesso")
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


//Retorna o perfil do usuario
userRouter.get('/profile', auth, async(req: CustomRequest, res: Response)=> {
    try{
        const userId = req.token?.sub;
        const user = await collections?.users?.findOne({_id: new ObjectId(userId)})

        if(user){
            res.status(200).send({email: user.email, name: user.name})
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
        console.log("funcionando")
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})



userRouter.post('/login', async(req, res)=> {
    try {
        const email = req.body.email
        const password = req.body.password
        const checkUser = await collections?.users?.findOne({email: email})
        if(!checkUser){
            res.status(404).send("Usuário não encontrado não encontrado")
        }
        
        if(checkUser?.password === password){
            const token = jwt.sign({sub: checkUser?._id},`${ACESS_SECRET}`)
            res.json({accesToken: token})
        }else{
            res.status(404).send("Usuário não encontrado")
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
            res.status(201).send({"message": "usuario deletado com sucesso"})
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