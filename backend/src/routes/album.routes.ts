import { albumDetails, searchAlbum } from '../config/spotifyConfig';
import { Router } from "express";

const router = Router();

router.get('/searchAlbum/:albumName', async (req, res)=> {
    const albumName = req.params.albumName
    const offset = parseInt(req.query.offset as string) || 0
    try {
        const albumData = await searchAlbum(albumName, offset)
        const formatted = albumData.map(item => ({
            id: item.id,
            album_name: item.name,
            album_type: item.type,
            artist_name: item.artists.map(artist=> ({
                id: artist.id,
                name: artist.name
            })),
            image_url: item.images.map(images => ({
                link: images.url,
                height: images.height,
                width: images.width
            })),
            release_date: item.release_date
        }))
        res.status(200).json(formatted)
    }catch(e) {
        res.status(500).json({"erro": e})
    }
})
router.get('/idAlbum/:idAlbum', async (req, res)=> {
    const idAlbum = req.params.idAlbum
    try {
        const albumData = await albumDetails(idAlbum)
        if(albumData === null) {
            res.status(404).json({message: `Album Data with the ID: ${albumData} not found`})
        }else{
            const formatted = {
                id: albumData.id,
                albumType: albumData.album_type,
                albumName: albumData.name,
                releaseDate: albumData.release_date,
                externalLink: albumData.external_urls.spotify,
                albumImage: albumData.images.map(images => ({
                    link: images.url,
                    height: images.height,
                    width: images.width
                })),
                artists: albumData.artists.map(artist=> ({
                    id: artist.id,
                    name: artist.name
                })),
                tracks: albumData.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    orderTrack: track.track_number,
                    duration: track.duration_ms
                }))
            }
            res.status(200).json(formatted)
        }
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
export default router