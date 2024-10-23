import { playlistTracks } from '../config/spotifyConfig';
import { Router } from "express";

const router = Router();

router.get('/playlistTracks/:id', async(req, res)=> {
    const idPlaylist = req.params.id
    
    try{
        const playlistData = await playlistTracks(idPlaylist, )
        if(playlistData === null){
            res.status(404).json({message: `Playlist with the ID: ${idPlaylist} Data not found`})
        }else{
            const formatted = playlistData.map(item => ({
                id: item.track?.id,
                track_name: item.track?.name,
                artist_name: item.track?.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name
                })),
                album_name: item.track?.album.name,
                album_type: item.track?.album.album_type,
                album_id: item.track?.album.id,
                image_urls: item.track?.album.images.map(image => ({
                    link: image.url,
                    width: image.width,
                    height: image.height
                }))

            }))
            res.status(200).json(formatted)

        }
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})

export default router