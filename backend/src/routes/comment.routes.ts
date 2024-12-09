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
            const commentId = new ObjectId()
            const comment = {
                _id: commentId,
                userName: userName,
                text: req.body.text,
                date: new Date()
            }
            const notification = {
                _id: new ObjectId(),
                title: 'Um usuário comentou no seu Dissay',
                type: 'Comment',
                idObject: `${findDissay._id}`,
                idOptional: `${commentId}`
            }
            const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {comments: comment}}, { returnDocument: "after" })
           
            await collections?.users?.findOneAndUpdate({userName: findDissay.userName}, {$push: {notifications: notification}})
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
            const commentAwnserId = new ObjectId() // cria um id para essa resposta

            const comment = {
                _id: commentAwnserId, // passa esse id para o comment
                userName: userName,
                idParent: commentId,
                idParentAwnser: req.body.idAwnser ?? null,
                text: req.body.text,
                date: new Date()
            }
            const parentComment = findDissay.comments?.find((c: any) => c._id.toString() === comment.idParent)
            if(parentComment){
                const userNameCommentParent = parentComment.userName
                const notification = {
                    _id: new ObjectId(),
                    title: 'Um usuário te respondeu',
                    type: 'Comment',
                    idObject: `${findDissay._id}`,
                    idOptional: `${commentAwnserId}`
                }
            
    
                await collections?.users?.findOneAndUpdate({userName: userNameCommentParent}, {$push: {notifications: notification}})
                
                if(comment.idParentAwnser !== null){
                    const parentCommentAwnser = findDissay.comments?.find((c: any) => c._id.toString() === comment.idParentAwnser)
                    await collections?.users?.findOneAndUpdate({userName: parentCommentAwnser}, {$push: {notifications: notification}})

                }
                const editedDissay = await collections?.dissays?.findOneAndUpdate({_id: findDissay._id}, {$push: {comments: comment}},{ returnDocument: "after" })

                if(editedDissay){
                    return res.status(200).json({editedDissay})
                }else{
                    return res.status(404).json({message: "Dissay ou usuário não encontrado"})
                }
                
            }else{
                return res.status(404).json({message: "Usuário pai não encontrado"})

            }
            
        }
    }catch(error){
        console.error("Erro ao comentar no dissay: ", error)
        return res.status(500).json({error: error})
    }
})

commentRouter.delete("/deleteComment/:id", auth, async (req: CustomRequest, res: Response) => {
    try {
        const commentId = new ObjectId(req.params.id);
        const userName = req.token?.userName;

        // Buscar o usuário autenticado e o Dissay com o comentário
        const findUser = await collections?.users?.findOne({ userName });
        const findDissay = await collections?.dissays?.findOne({ "comments._id": commentId });

        if (!findUser || !findDissay) {
            return res.status(404).json({ message: "Dissay ou usuário não encontrado" });
        }

        const userOwner = findDissay.userName;

        // Remover respostas associadas ao comentário
        await collections?.dissays?.updateMany(
            { _id: findDissay._id },
            { $pull: { comments: { idParent: commentId.toString() } } }
        );

        // Remover o comentário principal
        const deleteComment = await collections?.dissays?.updateOne(
            { _id: findDissay._id },
            { $pull: { comments: { _id: commentId, userName } } }
        );

        if (!deleteComment?.acknowledged || deleteComment.modifiedCount === 0) {
            return res.status(400).json({ message: "Ocorreu um erro ao deletar o comentário" });
        }

        // Remover notificações relacionadas ao comentário do usuário dono do Dissay
        await collections?.users?.updateOne(
            { userName: userOwner },
            { $pull: { notifications: { idOptional: commentId.toString() } } }
        );

        // Remover notificações relacionadas a respostas, se aplicável
        const commentOfDissay = findDissay.comments?.find(i => i._id!.equals(commentId));
        if (commentOfDissay && commentOfDissay.idParent) {
            const parentComment = findDissay.comments?.find(i => i._id!.equals(new ObjectId(commentOfDissay.idParent)));
            if (parentComment) {
                await collections?.users?.updateOne(
                    { userName: parentComment.userName },
                    { $pull: { notifications: { idOptional: commentId.toString() } } }
                );
            }
        }

        // Verificar e remover o campo notifications se estiver vazio para o dono do Dissay
        const ownerNotifications = await collections?.users?.findOne({ userName: userOwner });
        if (ownerNotifications?.notifications?.length === 0) {
            await collections?.users?.updateOne(
                { userName: userOwner },
                { $unset: { notifications: "" } }
            );
        }

        res.status(200).json({ message: "Comentário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar comentário do dissay: ", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});
