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
                _id: new ObjectId(),
                userName: findUser.userName,
                rate: req.body.rate,
                date: new Date()
            }
            if(avaliation.rate > 5){
                return res.status(500).json({message: "quantidade inválida"})
            }
            const totalAvaliations = (findDissay.avaliations?.length || 0) + 1;
            const rateAll = (findDissay.avaliations?.reduce((acc, avaliation) => acc + avaliation.rate, 0) || 0) + avaliation.rate;
            const rateTotal = rateAll / totalAvaliations
            const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {avaliations: avaliation}, $set: {totalRate: rateTotal}})
            if(editedDissay){
                return res.status(200).json({avaliations: editedDissay.avaliations})
            }
        }else{
            return res.status(404).json({message: "Dissay ou usuário não encontrado"})
        }
    }catch(error){
        console.error("Erro ao adicionar avaliação: ", error)
        return res.status(500).json({error: error})
    }
})

avaliationRouter.get("/getAvaliationUser/:id", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        const userName = req.token?.userName
        if( findDissay?.avaliations && findDissay.avaliations?.length > 0){
            const indexAvaliation = findDissay.avaliations?.findIndex(av => av.userName === userName)
            if(indexAvaliation !== -1){
                return res.status(200).json(findDissay.avaliations[indexAvaliation].rate)
            }else{
                return null
            }
        }else{
            return null
        }
    }catch(error){
        console.error("Erro ao pegar avaliacao: ", error)
        return res.status(500).json({error: error})
    }
})


avaliationRouter.put("/editAvaliation/:id", auth, async(req: CustomRequest, res: Response)=> {
    try {
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findDissay) {
            const avaliationIndex = findDissay.avaliations?.findIndex(av => av.userName == userName)
            if(avaliationIndex !== -1 && findDissay.avaliations){
                const oldRate = findDissay.avaliations[avaliationIndex!].rate;

                findDissay.avaliations[avaliationIndex!].rate = req.body.rate;
                findDissay.avaliations[avaliationIndex!].date = new Date();
                
                const totalAvaliations = (findDissay.avaliations?.length);
                const rateAll = (findDissay.avaliations?.reduce((acc, avaliation) => acc + avaliation.rate, 0));
                const rateTotal = rateAll / totalAvaliations
                const editedDissay = await collections?.dissays?.updateOne({_id: findDissay._id}, 
                    {$set: {
                    [`avaliations.${avaliationIndex}.rate`]: req.body.rate,
                    [`avaliations.${avaliationIndex}.date`]: new Date(),
                    totalRate: rateTotal}})
                if(editedDissay){
                    return res.status(200).json({message: "avaliado com sucesso"})
                }else{
                    return res.status(400).json({message: "ocorreu um erro ao editar"})
                }
            }else{
                return res.status(404).json({message: "usuário não encontrado"})
            }
        }
    }catch(error){
        console.error("Erro ao adicionar avaliação: ", error)
        return res.status(500).json({error: error})
    }
})

avaliationRouter.delete("/removeAvaliation/:id", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findDissay) {
            const deleteAvaliation = await collections?.dissays?.updateOne({_id: findDissay._id}, {$pull: {avaliations: {userName: userName}}})
            if(deleteAvaliation?.acknowledged){
                return res.status(200).json({message:"avaliação removida"})
            }else{
                return res.status(400).json({message: "ocorreu um erro ao remover"})
            }
        }else{
            return res.status(404).json({message: "dissay não encontrado"})
        }
    }catch(error){
        console.error("Erro ao excluir avaliação: ", error)
        return res.status(500).json({error: error})
    }
})