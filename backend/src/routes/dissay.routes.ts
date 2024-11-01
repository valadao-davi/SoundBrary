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
        const dateToday = new Date()
        const dissay = {
            name: req.body.name,
            musicId: musicId,
            userName: userName,
            instruments: req.body.instruments,
            createdAt: dateToday
        }
        const result = await collections?.dissays?.insertOne(dissay)
        if(result?.acknowledged){
            res.status(200).json({message: "Dissay criado"})
        }
    }catch(error){
        console.error("Erro no método criar post: ", error)
        return res.status(500).json({error: error})
    }
})