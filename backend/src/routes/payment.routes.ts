import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import * as PixPayload from 'pix-payload';

import { payload } from "pix-payload";
import  QRCode  from 'qrcode';


export const paymentRoutes = express.Router();
paymentRoutes.use(express.json())
dotenv.config({path: './src/.env'})


paymentRoutes.post('/generate-pix', async(req, res)=> {
    try{
        console.log(req.body);
        const userFound = await collections?.users?.findOne({userName: req.body.username})
        if (!userFound) {
            return res.status(404).json({ erro: 'User not found' });
        }
        console.log('usuário encontrado:', userFound); 
        const pixName = userFound.formalName
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9 ]/g, "")
        .toUpperCase()
        .substring(0, 25);

        const pixCity = userFound.city
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9 ]/g, "")
        .toUpperCase()
        .substring(0, 15);
        const copyPaste = payload({
            name: pixName,
            key: userFound.pixKey!,
            amount: req.body.value,
            city: pixCity,
            transactionId: "***"        
        });
        const qrCode = await QRCode.toDataURL(copyPaste);
        res.status(200).json({qrCode: qrCode, copyPaste: copyPaste})
        
        
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

