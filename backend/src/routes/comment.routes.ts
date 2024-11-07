import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {auth} from './user.routes'


export const commentRouter = express.Router();
commentRouter.use(express.json())
dotenv.config({path: './src/.env'})
const { ACCESS_SECRET } =  process.env

interface CustomRequest extends Request {
    token?: JwtPayload; // A propriedade token pode ser undefined
}

//Remover depois
commentRouter.get("/getCommentsDissay/:id", async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findDissay?.comments && findDissay.comments?.length > 0){
            return res.status(200).json({comments: findDissay.comments})
        }else{
            return res.status(404).json({message: "Dissay não encontrado"})
        }
    }catch(error){
        console.error("Erro ao pegar comentários do dissay: ", error)
        return res.status(500).json({error: error})
    }
})

commentRouter.get("/getCommentId/:id", async(req: CustomRequest, res: Response)=> {
    try{
        const commentId = req.params?.id
        const findDissay = await collections?.dissays?.findOne( 
        { "comments._id": new ObjectId(commentId) },
        { projection: { "comments.$": 1 } } )
        if(findDissay?.comments && findDissay.comments?.length > 0){
            return res.status(200).json(findDissay.comments[0])
        }else{
            return res.status(404).json({message: "Dissay não encontrado"})
        }
    }catch(error){
        console.error("Erro ao pegar comentários do dissay: ", error)
        return res.status(500).json({error: error})
    }
})


commentRouter.post("/commentDissay/:id", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const dissayId = req.params?.id
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        const findDissay = await collections?.dissays?.findOne({_id: new ObjectId(dissayId)})
        if(findUser && findDissay){
            const comment = {
                _id: new ObjectId(),
                userName: userName,
                text: req.body.text,
                date: new Date()
            }
            const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {comments: comment}}, { returnDocument: "after" })
            if(editedDissay){
                return res.status(200).json({editedDissay})
            }
        }else{
            return res.status(404).json({message: "Dissay ou usuário não encontrado"})
        }
    }catch(error){
        console.error("Erro ao comentar no dissay: ", error)
        return res.status(500).json({error: error})
    }
})

commentRouter.post("/awnserDissay/:id", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const commentId = req.params?.id
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        const findDissay = await collections?.dissays?.findOne({"comments._id": new ObjectId(commentId)})
        if(findUser && findDissay){
            const comment = {
                _id: new ObjectId(),
                userName: userName,
                idParent: commentId,
                idParentAwnser: req.body.idAwnser ?? null,
                text: req.body.text,
                date: new Date()
            }
            const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {comments: comment}},{ returnDocument: "after" })
            if(editedDissay){
                return res.status(200).json({editedDissay})
            }
        }else{
            return res.status(404).json({message: "Dissay ou usuário não encontrado"})
        }
    }catch(error){
        console.error("Erro ao comentar no dissay: ", error)
        return res.status(500).json({error: error})
    }
})

commentRouter.delete("/deleteComment/:id", auth, async(req: CustomRequest, res: Response)=> {
    try{
        const commentId = new ObjectId(req.params.id)
        const userName = req.token?.userName
        const findUser = await collections?.users?.findOne({userName: userName})
        const findDissay = await collections?.dissays?.findOne({"comments._id": new ObjectId(commentId)})
       if(findUser && findDissay){
            const deleteReplies = await collections?.dissays?.updateOne({_id: findDissay._id}, {$pull: {comments:{idParent: commentId.toString()}}})
            const deleteComment = await collections?.dissays?.updateOne(
                { _id: findDissay._id },
                { $pull: { comments: { _id: commentId, userName: userName } } }
            );
            if(deleteComment?.acknowledged && deleteComment?.modifiedCount > 0){
                res.status(200).json({ message: "Comentário deletado com sucesso" });
            }else{
                res.status(400).json({ message: "Ocorreu um erro ao deletar o comentário" });
            }
       }else{
        return res.status(404).json({message: "Dissay ou usuário não encontrado"})
    }
    }catch(error){
        console.error("Erro ao deletar comentário do dissay: ", error)
        return res.status(500).json({error: error})
    }
})