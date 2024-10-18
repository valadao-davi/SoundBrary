import { Router } from "express";
import { searchArtist, detailsArtist } from "../config/spotifyConfig";

const router = Router();

router.get('/searchArtist/:artistName', async(req, res)=> {
    const artistName: string = req.params.artistName
    try {
        const artistData = await searchArtist(artistName)
        const formatted = await Promise.all(artistData.map(async (artist) => {
            const details = await detailsArtist(artist.id)
            return {
                id: artist.id,
                artist: artist.name,
                image: details?.images[0]?.url
            }
        }))
        res.status(200).json(formatted)
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
router.get('/:id', async(req, res)=> {
    const idArtist = req.params.id
    try {
        const artistData = await detailsArtist(idArtist)
        if(artistData === null) {
            res.status(404).json({message: `Artist with the ID: ${idArtist} Data not found`})
        }
        res.status(200).json(artistData)
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
export default router