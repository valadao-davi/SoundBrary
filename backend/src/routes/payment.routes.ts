import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import Pix from 'pix-payload';
import QRCode from 'qrcode';


export const paymentRoutes = express.Router();
paymentRoutes.use(express.json())
dotenv.config({path: './src/.env'})

paymentRoutes.get('/:username', async(req, res)=> {
    try{
        const username = req.params?.username
        if(username){
            const userFound = await collections?.users?.findOne({userName: username})
            if(userFound){
                res.status(200).json({pixKey: userFound.pixKey, formalName: userFound.formalName, city: userFound.city})
            }
        }
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

paymentRoutes.post('/generate-pix', async(req, res)=> {
    try{
        const userFound = await collections?.users?.findOne({userName: req.body.username})
        if(userFound) {
            const pixInf = new Pix(
                userFound.pixKey,
                userFound.formalName,
                userFound.city,
                req.body.value,
                req.body.description
            )
            const copyPaste = pixInf.getPayload();
            const qrCode = await QRCode.toDataURL(copyPaste);
            res.status(200).json({qrCode: qrCode, copyPaste: copyPaste})
        }
        
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

