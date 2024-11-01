import { playlistTracks } from '../config/spotifyConfig';
import { Router } from "express";

const router = Router();

router.get('/playlistTracks/:id', async(req, res)=> {
    const idPlaylist = req.params.id
    
    try{
        const playlistData = await playlistTracks(idPlaylist)
        if(playlistData === null){
            res.status(404).json({message: `Playlist with the ID: ${idPlaylist} Data not found`})
        }else{
            const formatted = playlistData.map(item => ({
                id: item.track?.id,
                name: item.track?.name,
                artists: item.track?.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name
                })),
                albumName: item.track?.album.name,
                albumType: item.track?.album.album_type,
                albumId: item.track?.album.id,
                albumImages: item.track?.album.images.map(image => ({
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