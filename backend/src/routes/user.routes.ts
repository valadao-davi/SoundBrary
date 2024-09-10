import { collections } from './../config/db';
import * as express from 'express'
import { ObjectId } from 'mongodb';

export const userRouter = express.Router();
userRouter.use(express.json())


//Função de retornar os usuários
userRouter.get('/', async(_req, res)=> {
    try{
        const users = await collections?.users?.find({}).toArray();
        res.status(200).send(users)
        console.log("funcionando")
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

//Função de retornar os usuários com base no id
userRouter.get('/:id', async (req, res)=> {
    try{
        const id = req?.params?.id
        const query = { _id: new ObjectId(id) }
        const user = await collections?.users?.findOne(query)

        if(user){
            res.status(200).send(user)
        }else{
            res.send(404).send(`Não foi possível encontrar usuário com id: ${id}`)
        }
    }catch(error){
        res.status(404).send(`Não foi possível encontrar usuário com id: ${req?.params?.id}`);
    }
})

//função de dar post
userRouter.post('/', async(req, res)=> {
    try{
        const user = req.body
        const result = await collections?.users?.insertOne(user)

        if(result?.acknowledged){
            res.status(201).send(`Usuário criado com sucesso no id de: ${result.insertedId}`)
        }else{
            res.status(500).send("Falha em criar usuário")
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})


//função de editar
userRouter.put("/:id", async(req, res)=> {
    try{
        const id = req?.params?.id
        const query= { _id: new ObjectId(id) }
        const user = req.body
        const result = await collections?.users?.updateOne(query, {$set: user})

        if(result && result.matchedCount){
            res.status(201).send(`Usuário alterado com sucesso: ${result}`)
        }else if(!result){
            res.status(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
        }else if(!result.matchedCount){
            res.status(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
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
            res.status(201).send(`Usuário deletado com sucesso`)
        }else if (!result){
            res.send(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
        }else if (!result.deletedCount){
            res.send(404).send(`Não foi possível encontrar usuário com id: ${req.params.id}`)
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})