import axios from "axios";


//  Variavel de token a ser recebida
let acessToken: string | null = null;


// Funções de requisição para criação do uso do Token
export const getAcessToken = async(): Promise<void> => {
    const {clientID, clientSecret} = process.env

    if(!clientID || !clientSecret) {
        throw new Error("Client ID ou Client Secret não definidos no .env")
    }


    const url: string = "https://accounts.spotify.com/api/token"
    
    const data: URLSearchParams = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientID,
        client_secret: clientSecret
    })

    try {
        const response = await axios.post<{ access_token: string, expires_in: number }>(url, data.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        })
        acessToken = response.data.access_token
        setTimeout(getAcessToken, (response.data.expires_in * 1000) - 5000) // renova 5 segundos antes de expirar
        console.log("Token renovado para: ", acessToken)
    }catch(err) {
        console.error('Ocorreu um erro: ', err)
    }
}

//Função de busca geral:
export const searchSample = async <T>(type: 'track' | 'album' | 'artist', query: string, offset: number = 0): Promise<T[]> => {
    const url: string = `https://api.spotify.com/v1/search?query=${query}&type=${type}&locale=pt-BR%2Cpt%3Bq%3D0.9&offset=${offset}&limit=20`
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        })
        return response.data[type + 's'].items
    }catch(e){
        console.error("Erro na busca: ", e)
        return []
    }
}

export const searchGeneral = async(itemName: string): Promise<any>=> {
    const url: string = `https://api.spotify.com/v1/search?q=${itemName}&type=artist%2Calbum%2Ctrack`
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        })
        return response.data
    }catch(e){
        console.error("Erro na busca: ", e)
    }
}
//Procura pela música
export const searchTrack = async(musicName: string, offset: number = 0) => searchSample<SpotifyApi.TrackObjectFull>("track", musicName, offset)

//Procura pelo artista
export const searchArtist = async(artistName: string, offset: number = 0)=> searchSample<SpotifyApi.ArtistObjectFull>("artist", artistName, offset)

//Procura pelo álbum
export const searchAlbum = async(albumName: string, offset: number = 0) => searchSample<SpotifyApi.AlbumObjectSimplified>("album", albumName, offset)


//Entra nos detalhes do item
export const detailsGeneral = async<T>(type: 'artists' | 'tracks' | 'albums', id: string): Promise<T | null> => {
    const url: string = `https://api.spotify.com/v1/${type}/${id}`

    try {
        const response = await axios.get<T>(url, {
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        })
        return response.data
    }catch(e){
        console.error('Erro: ', e)
        return null
    }

}
// Entra nos detalhes do artista
export const detailsArtist = async(idArtist: string) => detailsGeneral<SpotifyApi.ArtistObjectFull | null>("artists", idArtist)

//Entra nos detalhes da música
export const musicDetails = async(idMusic: string) => detailsGeneral<SpotifyApi.TrackObjectFull | null>("tracks", idMusic)

//Detalhes do álbum
export const albumDetails = async(idAlbum: string) => detailsGeneral<SpotifyApi.AlbumObjectFull | null>("albums", idAlbum)


// Entra nas tracks de uma playlist
export const playlistTracks = async(idPlaylist: string): Promise<SpotifyApi.PlaylistTrackObject[]> => {
    const url = `https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`
    try {
        const response = await axios.get<{ items: SpotifyApi.PlaylistTrackObject[] }>(url, {
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        })
        const listItems: SpotifyApi.PlaylistTrackObject[] = response.data.items
        return listItems
    }catch(e){
        console.error(e)
        return []
    }
}