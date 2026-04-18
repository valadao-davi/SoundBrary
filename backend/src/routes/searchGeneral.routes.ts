import { searchGeneral } from './../config/spotifyConfig';
import { Router } from 'express';

const router = Router()

router.get('/:query', async (req, res) => {
  const query = req.params.query;

  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const itemsData = await searchGeneral(query, limit, offset);

    if (!itemsData) {
      return res.status(404).json({
        message: `Search not found with the query: ${query}`
      });
    }

    const musicData = itemsData.tracks.items.map((music: any) => ({
      id: music.id,
      name: music.name,
      artists: music.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name
      })),
      albumName: music.album.name,
      albumImages: music.album.images.map((image: any) => ({
        link: image.url,
        width: image.width,
        height: image.height
      }))
    }));

    const albumData = itemsData.albums.items.map((album: any) => ({
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
    }));

    const artistData = itemsData.artists.items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      artistImages: artist.images.map((image: any) => ({
        link: image.url,
        width: image.width,
        height: image.height
      }))
    }));

    return res.status(200).json({
      musics: musicData,
      albums: albumData,
      artists: artistData
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ erro: e });
  }
});

export default router
