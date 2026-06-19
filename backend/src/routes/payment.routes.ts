import { collections } from './../config/db';
import * as express from 'express'
import * as dotenv from 'dotenv';
import * as PixPayload from 'pix-payload';

import { payload } from "pix-payload";
import  QRCode  from 'qrcode';


export const paymentRoutes = express.Router();
paymentRoutes.use(express.json())
dotenv.config({path: './src/.env'})

paymentRoutes.get('/:username', async(req, res)=> {
    try{
        const username = req.params?.username
        const userFound = await collections.users?.findOne({
            userName: username
        });
        if(!userFound){
            res.status(404).send(`User ${username} not found`)
            return;
        }
        res.status(200).json({pixKey: userFound.pixKey, formalName: userFound.formalName, city: userFound.city})    
        
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

paymentRoutes.post('/generate-pix', async(req, res)=> {
    try{
        const userFound = await collections?.users?.findOne({userName: req.body.username})
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
        if(userFound) {
            const copyPaste = payload({
            name: pixName,
            key: userFound.pixKey!,
            amount: req.body.value,
            city: pixCity,
            transactionId: "***"        
        });

        const qrCode = await QRCode.toDataURL(copyPaste);
            res.status(200).json({qrCode: qrCode, copyPaste: copyPaste})
        }
        
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

