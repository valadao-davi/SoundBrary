import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {auth} from './user.routes'


export const dissayRouter = express.Router();
dissayRouter.use(express.json())
dotenv.config({path: './src/.env'})
const { ACCESS_SECRET } =  process.env

interface CustomRequest extends Request {
    token?: JwtPayload; // A propriedade token pode ser undefined
}

/*Fins de teste*/
dissayRouter.get("/", async(_req, res)=> {
    try {
        const dissays = await collections?.dissays?.find({}).toArray()
        if(dissays){
            res.status(200).json(dissays)
        }else{
            res.status(200).send({message: "Não há dissays no momento"})
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknow error")
    }
})
//Os 10 primeiros dissays recentes
dissayRouter.get("/recentDissays", async(_req, res)=> {
    try {
        const dissays = await collections?.dissays?.find({}).sort({createdAt: -1}).limit(10).toArray()
        if(dissays){
            res.status(200).send(dissays)
        }else{
            res.status(200).send({message: "Não há dissays no momento"})
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknow error")
    }
})

dissayRouter.post("/createDissay/:musicId", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const userName = req.token?.userName
        const musicId = req.params.musicId
        const dissay = {
            name: req.body.name,
            musicId: musicId,
            userName: userName,
            instruments: req.body.instruments,
            createdAt: new Date(),
            desc: req.body?.description,
        }
        const findUser = await collections?.users?.findOne({userName: userName})
        if(findUser){
            const result = await collections?.dissays?.insertOne(dissay)
            if(result?.insertedId){
                console.log("Dissay criado")
                const addToUser = await collections?.users?.updateOne({_id: findUser._id}, {$push: { dissaysCreated: result.insertedId.toString()}})
                if(addToUser){
                    console.log("Adicionado ao usuario")
                    const notification = {
                        title: `Uma música que você salvou foi publicada`,
                        type: "Dissay",
                        idObject: `${result.insertedId.toString()}`
                    }
                    const notificateUsers = await collections?.users?.updateMany({musicSaved: musicId}, {$push: {notifications: notification}})
                    return res.status(200).json({message: "Dissay criado"})
                }else{
                    return res.status(404).send("Erro ao adicionar na lista de IDS do usuario")
                }
            }else{
                return res.status(404).send("Dissay nao encontrado")
            }
        }
        
        
    }catch(error){
        console.error("Erro no método criar post: ", error)
        return res.status(500).json({error: error})
    }
})

dissayRouter.get('/getDissay/:id', async(req, res)=> {
    try{
        const id = req.params?.id
        if(id){
            const dissay = await collections?.dissays?.findOne({_id: new ObjectId(id)})
            if(dissay){
                res.status(200).send(dissay)
            }
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");

    }
})

dissayRouter.get("/getDissayByMusic/:musicId", async(req, res)=> {
    try{
        const musicId = req.params?.musicId
        if(musicId){
            const dissay = await collections?.dissays?.find({musicId: musicId}).toArray()
            if(dissay){
                res.status(200).send(dissay)
            }
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

dissayRouter.put('/editDissay/:id', auth, async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findUser && findDissay){
            const dissay = req.body.dissay
            const result = await collections?.dissays?.findOneAndUpdate({_id: new ObjectId(findDissay._id)}, {$set: dissay})
            console.log(result)
            if(result){
                return res.status(200).json({message: "Dissay atualizado com sucesso"})
            }
        }else{
            return res.status(404).json({error: "Usuario nao encontrado"})
        }
    }catch(error){
        console.error("Erro no método editar post: ", error)
        return res.status(500).json({error: error})
    }
})

dissayRouter.delete('/deleteDissay/:id', auth, async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        
        if(dissayId && findUser){
            const result = await collections?.dissays?.findOneAndDelete({_id: new ObjectId(dissayId)})
            const removeOfUser = await collections?.users?.findOneAndUpdate({userName: userName}, {$pull: {dissaysCreated: dissayId}})
            if(result && removeOfUser){
                return res.status(200).json({message: "Dissay deletado com sucesso"})
            }
        }else{
            return res.status(404).json({error: "Usuario nao encontrado"})
        }
    }catch(error){
        console.error("Erro no método editar post: ", error)
        return res.status(500).json({error: error})
    }
})

