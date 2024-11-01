import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
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

dissayRouter.get("/", async(_req, res) => {
    try{
        const dissays = await collections?.dissays?.find({}).toArray()
        res.status(200).send(dissays)
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

dissayRouter.get("/:id", async(req, res)=> {
    try {
        const musicId = req.params.id
        if(musicId){
            const dissays = await collections?.dissays?.find({ musicId: musicId }).toArray()
            if(dissays && dissays.length > 0){
                res.status(200).json(dissays)
            }else{
                res.status(404)
            }
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

dissayRouter.post("/createDissay", auth,  async(req: CustomRequest, res: Response)=> {
    try{
        const userId = req.token?.sub;
        if(userId){
            const currentDate = new Date()
            const dissay = {
                userId: userId,
                name: req.body.name,
                musicId: req.body.musicId,
                instruments: req.body.instruments,
                createdAt: currentDate
            }
            const result = await collections?.dissays?.insertOne(dissay)
            if(result){
                res.status(200).json({dissay: dissay})
            }
        }else{
            return res.status(400).json({error: "Autentique para continuar"})
        }
        
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Erro desconhecido")
    }
})
