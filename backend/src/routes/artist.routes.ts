import { Router } from "express";
import { searchArtist, detailsArtist, artistAlbums } from "../config/spotifyConfig";

const router = Router();

router.get('/searchArtist/:artistName', async(req, res)=> {
    const artistName: string = req.params.artistName
    const offset = parseInt(req.query.offset as string) || 0
    try {
        const artistData = await searchArtist(artistName, offset)
        const formatted = await Promise.all(artistData.map(async (artist) => {
            const details = await detailsArtist(artist.id)
            return {
                id: artist.id,
                name: artist.name,
                artistImages: details?.images.map(images => ({
                    link: images.url,
                    width: images.width,
                    height: images.height
                })),
                followers: details?.followers.total
            }
        }))
        res.status(200).json(formatted)
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
router.get('/idArtist/:id', async(req, res)=> {
    const idArtist = req.params.id
    try {
        const artistData = await detailsArtist(idArtist)
        if(artistData === null) {
            res.status(404).json({message: `Artist with the ID: ${idArtist} Data not found`})
        }else{
            const formatted = {
                id: artistData.id,
                name: artistData.name,
                artistFollowers: artistData.followers.total,
                artistImages: artistData.images.map(images => ({
                    link: images.url,
                    height: images.height,
                    width: images.width
                })),
                externalLink: artistData.external_urls.spotify,
                genres: artistData.genres
            }
            res.status(200).json(formatted)
        }
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})

router.get('/idArtist/album/:id', async(req, res)=> {
    const idArtist = req.params.id
    try {
        const albumData = await artistAlbums(idArtist)
        if(albumData === null){
            res.status(404).json({message: `Artist with the ID: ${idArtist} Data not found`})
        }else{
            const formatted = await Promise.all(albumData.map(items => ({
                id: items.id,
                albumName: items.name,
                albumType: items.album_group,
                artists: items.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name
                })),
                releaseDate: items.release_date,
                albumImage: items.images.map(image => ({
                    link: image.url,
                    width: image.width,
                    height: image.height
                }))
            })))
            res.status(200).json(formatted)
       
    } }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
export default router