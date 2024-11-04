import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {auth} from './user.routes'


export const avaliationRouter = express.Router();
avaliationRouter.use(express.json())
dotenv.config({path: './src/.env'})
const { ACCESS_SECRET } =  process.env

interface CustomRequest extends Request {
    token?: JwtPayload; // A propriedade token pode ser undefined
}
avaliationRouter.post("/avaliateDissay/:id", auth, async(req: CustomRequest, res:Response)=> {
    try {
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findUser && findDissay) {
            const avaliation = {
                userName: findUser.userName,
                rate: req.body.rate,
                date: new Date()
            }
            if(avaliation.rate > 5){
                return res.status(500).json({message: "quantidade inválida"})
            }
            const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {avaliations: avaliation}})
            if(editedDissay){
                return res.status(200).json({avaliations: editedDissay.avaliations})
            }
        }
    }catch(error){
        console.error("Erro ao adicionar avaliação: ", error)
        return res.status(500).json({error: error})
    }
})

avaliationRouter.get("/getAvaliationTotal/:id", async(req: CustomRequest, res:Response)=> {
    try{
        const dissayId = req.params?.id
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findDissay){
            if(findDissay.avaliations){
                const rateAll = findDissay.avaliations.reduce((acc, avaliation) => acc + avaliation.rate, 0);
                const rateTotal = rateAll / findDissay.avaliations.length
                return res.json({rateTotal})
            }
        }
    }catch(error){
        console.error("Erro ao pegar itens: ", error)
        return res.status(500).json({error: error})
    }
})
