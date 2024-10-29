import { searchGeneral } from './../config/spotifyConfig';
import { Router } from 'express';

const router = Router()

router.get('/:query', async(req, res)=> {
    const query = req.params.query
    const offset = parseInt(req.query.offset as string) || 0;
    try{
        const itemsData = await searchGeneral(query)
        if(itemsData === null){
            res.status(404).json({message: `Search not found with the query: ${query}`})
        }else{
            const musicData: any[] = itemsData.tracks.items.map((music: any) => ({
                id: music.id,
                name: music.name,
                artists: music.artists.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name
                }
                )),
                albumName: music.album.name,
                albumImages: music.album.images.map((image: any) => ({
                    link: image.url,
                    width: image.width,
                    height: image.height
                }))
            })).slice(offset, offset + 5)
            const albumData: any[] = itemsData.albums.items.map((album: any) => ({
                id: album.id,
                albumName: album.name,
                albumImage: album.images.map((image: any) => ({
                    link: image.url,
                    width: image.width,
                    height: image.height
                })),
                artists: album.artists.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name
                }))
            })).slice(offset, offset + 5)
            const artistData: any[] = itemsData.artists.items.map((artist: any) => ({
                id: artist.id,
                name: artist.name,
                artistImages: artist.images.map((image: any) => ({
                    link: image.url,
                    width: image.width,
                    height: image.height
                }))
            })).slice(offset, offset + 5)
            const formatted = {
                musics: musicData,
                albums: albumData,
                artists: artistData
            }
            res.status(200).json(formatted)
        }
       
    }catch(e){
        console.log(e)
        res.status(500).json({"erro": e})
    }
})

export default router
