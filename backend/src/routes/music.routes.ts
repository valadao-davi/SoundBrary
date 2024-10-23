import { searchTrack, musicDetails } from '../config/spotifyConfig';
import { Router } from "express";

const router = Router();

router.get('/searchMusic/:musicName', async (req, res)=> {
    const musicName: string = req.params.musicName
    try {
        const musicData: SpotifyApi.TrackObjectFull[] = await searchTrack(musicName)
        const formatted = musicData.map(item => ({
            id: item.id,
            song: item.name,
            album_type: item.album.album_type,
            album_name: item.album.name,
            artist_name: item.artists.map(artist=> ({
                id: artist.id,
                name: artist.name
            })),
            album_images: item.album.images.map(images => ({
                link: images.url,
                height: images.height,
                width: images.width
            })),
            album_id: item.album.id,
            duration: item.duration_ms
        }))
        res.status(200).json(formatted)
    }catch(e) {
        res.status(500).json({"erro": e})
    }
})

router.get('/musicId/:idMusic', async (req, res)=> {
    const idMusic = req.params.idMusic
    try {
        const musicData = await musicDetails(idMusic)
        if(musicData === null) {
            res.status(404).json({message: `Music Data with the ID: ${idMusic} not found`})
        }else{
            const formatted = {
                id: musicData.id,
                name: musicData.name,
                releaseDate: musicData.album.release_date,
                artists: musicData.artists.map(artist=> ({
                    id: artist.id,
                    name: artist.name
                })),
                albumId: musicData.album.id,
                albumType: musicData.album.album_type,
                albumName: musicData.album.name,
                orderTrack: musicData.track_number,
                albumImages: musicData.album.images.map(images => ({
                    link: images.url,
                    height: images.height,
                    width: images.width
                })),
                externalLink: musicData.external_urls.spotify,
                duration: musicData.duration_ms
            }
            res.status(200).json(formatted)
        }
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})
export default router